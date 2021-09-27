import React, { useCallback, useEffect, useState } from 'react';
import { constVoid, pipe } from 'fp-ts/function';

import { useNotification } from './components/Notification';
import { AlertMessage, fold, HasAlreadyJoinedMessage, ChatMessage, JoinMessage, Message, QuitMessage, RollMessage } from './message';
import { useRole } from './hooks/useRole';
import { remove } from './helpers/object';
import { ChatBoxes } from './pages/home/ChatBoxes';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { onSuccess } from './helpers/remoteData';
import { Time } from './pages/home/Time';

type Props = {
  currentUserName: string;
  stream: BehaviorSubject<Message | undefined>;
  emit: (message: Message['message']) => void;
}

export const connectedUsersSubject = new BehaviorSubject<Record<string,string | null | undefined>>({});

let runNb = 20;

export function SocketMessageHandler({currentUserName, stream, emit}: Props) {
  const [connectedUsers, setConnectedUsers] = useState(connectedUsersSubject.value);
  const { add } = useNotification();
  const { isMJ } = useRole();

  const hasAlreadyJoined = useCallback(({recipient}: HasAlreadyJoinedMessage['payload'], author: Message['author']) => {
    if (recipient === currentUserName) {
      connectedUsersSubject.next({
        ...connectedUsersSubject.value,
        [author.name]: author.avatar,
      });
    }
  }, [currentUserName]);

  const join = useCallback((_: JoinMessage['payload'], author: Message['author']) => {
    connectedUsersSubject.next({
      ...connectedUsersSubject.value,
      [author.name]: author.avatar,
    });
    add({
      id: `join_${author.name}`,
      type: 'message',
      message: `${author.name} vient de rejoindre la partie`,
      author: {
        name: author.name,
        avatar: author.avatar ?? ''
      },
    });
    emit({
      type: 'hasAlreadyJoined',
      payload: {
        recipient: author.name, 
      }
    });
  }, [add, emit]);

  const quit = useCallback(({name}: QuitMessage['payload'], author: Message['author']) => {
    connectedUsersSubject.next(remove(author.name, connectedUsersSubject.value));
    add({id: `quit_${name}`, type: 'success', message: `${name} vient de quitter la partie`});
  }, [add]);

  const chat =  useCallback(({message, recipient}: ChatMessage['payload'], author: Message['author']) => {
    if(currentUserName === recipient){
      add({id: `chat_${recipient}${message}`, type: 'message', message: `“${message}”`, author: {name: author.name, avatar: author.avatar ?? ''}});
      const sound = document.getElementById('sound-bip') as HTMLAudioElement;
      sound.play();
    }
  }, [add, currentUserName]);

  const roll = useCallback(({title, value}: RollMessage['payload'], author: Message['author']) => {
    add({
      id: `roll_${author}_${title}_${value}`,
      type: 'message',
      message: `"${title}": ${author.name} vient de faire ${value}`,
      author: {name: author.name, avatar: author.avatar ?? ''}
    });
    if(value <= 5){
      const sound = document.getElementById('sound-success') as HTMLAudioElement;
      sound.play();
    }else if(value >= 95){
      const sound = document.getElementById('sound-failure') as HTMLAudioElement;
      sound.play();
    }
  }, [add]);

  const alert = useCallback(({type}: AlertMessage['payload'], author: Message['author']) => {
    if(type === 'playerIsAsleep') {
      pipe(
        isMJ,
        onSuccess((isCurrentUserMJ) => {
          if (isCurrentUserMJ) {
            add({
              id: `sleepy_${author.name}`,
              type: 'message',
              message: `${author.name} s'ennuie`,
              author: {
                name: author.name,
                avatar: author.avatar ?? ''
              },
            });
            const sound = document.getElementById('sound-sleep') as HTMLAudioElement;
            sound.play();
          }
        }),
      );
    }
    if(type === 'playerNeedsPause'){
      add({
        id: `halt_${author.name}`,
        type: 'message',
        message: `${author.name} veut faire une pause`,
        author: {
          name: author.name,
          avatar: author.avatar ?? ''
        },
      });
      const sound = document.getElementById('sound-error') as HTMLAudioElement;
      sound.play();
    }
  }, [add, isMJ]);

  const onMessage = useCallback((message: unknown) => {
    return fold(currentUserName, {
      hasAlreadyJoined,
      join,
      quit,
      roll,
      chat,
      alert,
      time: constVoid,
      image: constVoid,
    })(message)
  }, [alert, chat, currentUserName, hasAlreadyJoined, join, quit, roll]);

  useEffect(() => {
    const subscription = connectedUsersSubject
      .subscribe({
        next: setConnectedUsers
      });
    return () => {
      subscription.unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (currentUserName) {
      const subscription = stream
        .asObservable()
        .pipe(
          filter(message => message != null),
          distinctUntilChanged(),
        )
        .subscribe({
          next: (message: unknown) => {
            if(runNb > 0){ // ensures no infinite cycles
              onMessage(message);
            } else {
              throw new Error('Infinite rerendering');
            }
          },
        });

      return () => {
        subscription.unsubscribe();
        runNb--;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserName]);

  return (<>
    <ChatBoxes users={connectedUsers} />
    <Time />
  </>);
}
