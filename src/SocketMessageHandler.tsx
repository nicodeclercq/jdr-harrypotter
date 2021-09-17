import React, { useCallback, useEffect, useState } from 'react';
import { pipe } from 'fp-ts/function';

import { useNotification } from './components/Notification';
import { AlertMessage, ChatMessage, fold, HasAlreadyJoinedMessage, JoinMessage, Message, QuitMessage, RollMessage } from './message';
import { useRole } from './hooks/useRole';
import { remove } from './helpers/object';
import { ChatBoxes } from './pages/home/ChatBoxes';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { onSuccess } from './helpers/remoteData';

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

  const roll = useCallback(({title, type, value}: RollMessage['payload'], author: Message['author']) => {
    add({id: `roll_${author}_${title}_${value}`, type, message: `"${title}": ${author} vient de faire ${value}`});
  }, [add]);

  const chat = useCallback(({ message, recipient, needsConfirmation }: ChatMessage['payload'], author: Message['author']) => {
    if(recipient === currentUserName){
      add({
        id: `chat_${message}_${author.name}`,
        type: 'message',
        message,
        action: needsConfirmation
          ? {
            run: () => {
              emit({
                type: 'chat',
                payload: {
                  message: 'Bien reçu!',
                  recipient: author.name,
                  needsConfirmation: false,
                }
              })
            },
            label:'OK'
          }
          : undefined,
          author: {
            name: author.name,
            avatar: author.avatar ?? ''
          },
      });
    }
  }, [add, currentUserName, emit]);

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
  </>);
}
