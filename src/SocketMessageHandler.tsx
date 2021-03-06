import React, { useCallback, useEffect, useRef } from 'react';
import { constVoid, pipe } from 'fp-ts/function';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { useNotification } from './components/Notification';
import { AlertMessage, fold, HasAlreadyJoinedMessage, ChatMessage, JoinMessage, Message, QuitMessage, RollMessage, PlayMusicMessage, SetBattleMapTokensPosition } from './message';
import { useRole } from './hooks/useRole';
import { ChatBoxes } from './pages/home/ChatBoxes';
import { fromRemoteData, onSuccess } from './helpers/remoteData';
import { Time } from './pages/home/Time';
import { useUser } from './pages/home/useUser';
import { useSound } from './hooks/useSound';
import { useBenny as useBennyHook } from './hooks/useBenny';
import { useConnectedUsers } from './hooks/useConnectedUsers';
import { useTokens } from './hooks/useTokens';

type Props = {
  currentUserName: string;
  stream: BehaviorSubject<Message | undefined>;
  emit: (message: Message['message']) => void;
}

let runNb = 20;

export function SocketMessageHandler({currentUserName, stream, emit}: Props) {
  const { setTokens } = useTokens();
  const { connectedUsers, add: connectUser, remove: disconnectUser } = useConnectedUsers();
  const { add } = useNotification();
  const { isMJ } = useRole();
  const { user } = useUser();
  const { play } = useSound();
  const { addBenny } = useBennyHook();
  const musicRef = useRef<HTMLAudioElement>(null);

  const hasAlreadyJoined = useCallback(({recipient}: HasAlreadyJoinedMessage['payload'], author: Message['author']) => {
    if (recipient === currentUserName) {
      connectUser(author.name, author.avatar);
    }
  }, [currentUserName, connectUser]);

  const join = useCallback((_: JoinMessage['payload'], author: Message['author']) => {
    connectUser(author.name, author.avatar);
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
  }, [add, emit, connectUser]);

  const quit = useCallback(({name}: QuitMessage['payload'], author: Message['author']) => {
    disconnectUser(author.name);
    add({id: `quit_${name}`, type: 'success', message: `${name} vient de quitter la partie`});
  }, [add, disconnectUser]);

  const chat =  useCallback(({message, recipient}: ChatMessage['payload'], author: Message['author']) => {
    if(currentUserName === recipient){
      if(message === '[giveBenny]'){
        add({id: `chat_${recipient}${message}`, type: 'message', message: `Tu as gagn?? un nouveau Joker`, author: {name: author.name, avatar: author.avatar ?? ''}});
        addBenny();
      }else{
        add({id: `chat_${recipient}${message}`, type: 'message', message: `???${message}???`, author: {name: author.name, avatar: author.avatar ?? ''}});
        play('bip');
      }
    }
  }, [add, addBenny, currentUserName, play]);

  const roll = useCallback(({title, value, type}: RollMessage['payload'], author: Message['author']) => {
    const types = {
      'critical-success': 'Succ??s critique',
      'success': 'Succ??s',
      'failure': '??chec',
      'critical-failure': '??chec critique',
      'free-throw': 'Lancer libre',
    } as const;
    
    add({
      id: `roll_${author}_${title}_${value}`,
      type: 'message',
      message: `"${title}": ${author.name} vient de faire ${value} (${types[type]})`,
      author: {name: author.name, avatar: author.avatar ?? ''}
    });
    if(type === 'critical-success'){
      play('success');
    }else if(type === 'critical-failure'){
      play('failure');
    }
  }, [add, play]);

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
            play('sleep');
          }
        }),
      );
    }
    if (type === 'playerNeedsPause') {
      add({
        id: `halt_${author.name}`,
        type: 'message',
        message: `${author.name} veut faire une pause`,
        author: {
          name: author.name,
          avatar: author.avatar ?? ''
        },
      });
      play('error');
    }
  }, [add, isMJ, play]);

  const useBenny = useCallback((payload: undefined, author: Message['author']) => {
    pipe(
      isMJ,
      onSuccess((isCurrentUserMJ) => {
        if (isCurrentUserMJ) {
          addBenny();
        }
        add({
          id: `benny_${author.name}`,
          type: 'message',
          message: `${author.name} ?? utilis?? un Joker`,
          author: {
            name: author.name,
            avatar: author.avatar ?? ''
          },
        });
      })
    );
  }, [add, addBenny, isMJ]);

  useEffect(() => {
    if(musicRef.current){
      musicRef.current.volume = 0.1;
    }
  }, [musicRef])

  const playMusic = useCallback(({url}: PlayMusicMessage['payload'], author: Message['author']) => {
    if(musicRef.current) {
      musicRef.current.src = url;
      musicRef.current.title= url;
      musicRef.current.play();
    }
  }, [musicRef]);
  const stopMusic= useCallback((payload: undefined, author: Message['author']) => {
    if(musicRef.current) {
      musicRef.current.src = '';
      musicRef.current.title= '';
      musicRef.current.pause();
    }
  }, [musicRef]);

  const setBattleMapTokensPosition = useCallback((payload: SetBattleMapTokensPosition['payload'], author: Message['author']) => {
    pipe(
      isMJ,
      onSuccess((isCurrentUserMJ) => {
        if(!isCurrentUserMJ){
          setTokens(payload);
        }
      }),
    );
  }, [isMJ, setTokens]);

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
      useBenny,
      playMusic,
      stopMusic,
      setBattleMapTokensPosition,
    })(message)
  }, [alert, chat, currentUserName, hasAlreadyJoined, join, playMusic, quit, roll, stopMusic, useBenny, setBattleMapTokensPosition]);

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

  return pipe(
    user,
    fromRemoteData((user) => <>
      <ChatBoxes me={user} users={connectedUsers} />
        <Time />
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: '16rem',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}>
        <audio ref={musicRef} controls loop />
        </div>
      </>
    )
  );
}
