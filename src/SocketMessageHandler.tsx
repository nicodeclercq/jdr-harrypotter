import React, { useEffect } from 'react';
import { pipe, constVoid } from 'fp-ts/function';
import * as RemoteData from '@devexperts/remote-data-ts';

import { useNotification } from './components/Notification';
import { fold } from './message';
import { useSocket } from './hooks/useSocket';
import { useMoney } from './pages/objects/useMoney';
import { useRole } from './hooks/useRole';

type Props = {
  currentUserName: string;
  currentUserAvatar: string;
}

export function SocketMessageHandler({currentUserName, currentUserAvatar}: Props){
  const { stream, emit } = useSocket();
  const { add } = useNotification();
  const { addMoney } = useMoney();
  const { isMJ } = useRole();

  useEffect(() => {
    const subscription = stream
      .subscribe({
        next: fold(currentUserName, {
          join: (_, author) => {
            add({
              id: `join_${author.name}`,
              type: 'message',
              message: `${author.name} vient de rejoindre la partie`,
              author: {
                name: author.name,
                avatar: author.avatar ?? ''
              },
            });
          },
          quit: ({name}) => {
            add({id: `quit_${name}`, type: 'success', message: `${name} vient de quitter la partie`});
          },
          roll: ({title, type, value}, author) => {
            add({id: `roll_${author}_${title}_${value}`, type, message: `"${title}": ${author} vient de faire ${value}`});
          },
          exchangeMoney: ({ amount, recipient }) => {
            if(recipient === currentUserName){
              addMoney(amount);
            }
          },
          chat: ({ message, recipient, needsConfirmation }, author) => {
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
          },
          alert: ({type}, author) => {
            if(type === 'playerIsAsleep') {
              pipe(
                isMJ,
                RemoteData.fold(
                  constVoid,
                  constVoid,
                  constVoid,
                  (isCurrentUserMJ) => {
                    if(isCurrentUserMJ){
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
                  },
                )
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
          },
        }),
      });

    return () => {
      subscription.unsubscribe();
    }
  }, [add, addMoney, currentUserName, isMJ, emit, stream]);

  return (<></>);
}
