import React, { useEffect } from 'react';

import { useNotification } from './components/Notification';
import { fold } from './message';
import { useSocket } from './useSocket';
import { useMoney } from './pages/objects/useMoney';

type Props = {
  currentUserName: string
}

function MessageHandler({currentUserName}: Props){
  const { stream, emit } = useSocket();
  const { add } = useNotification();
  const { addMoney } = useMoney();

  useEffect(() => {
    const subscription = stream
      .subscribe({
        next: fold(currentUserName, {
          join: ({name}) => {
            add({id: `join_${name}`, type: 'success', message: `${name} vient de rejoindre la partie`});
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
              add({id: `chat_${message}_${author}`, type: 'message', message, action: needsConfirmation ? {
                run: () => {
                emit({
                  type: 'chat',
                  payload: {
                    message: 'Bien reçu!',
                    recipient: author,
                    needsConfirmation: false,
                  }
                })
              }, label:'OK'} : undefined});
            }
          }
        }),
      });

    return () => {
      subscription.unsubscribe();
    }
  }, [add, addMoney, currentUserName, emit, stream]);

  return (
    <></>
  )
}

export function SocketMessageHandler({currentUserName, children}: {currentUserName: string; children: React.ReactNode}){
  return (
    <>
      <MessageHandler currentUserName={currentUserName} />
      {children}
    </>
  )
}
