import React, { useEffect } from 'react';
import * as RemoteData from '@devexperts/remote-data-ts';

import { useUser } from './pages/home/useUser';
import { useNotification } from './components/Notification';
import { fold } from './message';
import { constVoid } from 'fp-ts/lib/function';
import { useSocket } from './useSocket';
import { useMoney } from './pages/objects/useMoney';

type Props = {
  children: React.ReactNode,
}

export function SocketMessageHandler({children}: Props){
  const { stream } = useSocket();
  const { add } = useNotification();
  const { getName } = useUser();
  const { addMoney } = useMoney();
  const name = getName();

  useEffect(() => {
    const subscription = stream
      .subscribe({
        next: RemoteData.fold(
          () => constVoid,
          () => constVoid,
          () => constVoid,
          (currentUser: string) =>
            fold(currentUser, {
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
                if(recipient === currentUser){
                  addMoney(amount);
                }
              }
            }),
          )(name)
      });

    return () => {
      subscription.unsubscribe();
    }
  }, [add, addMoney, name, stream]);

  return (
    <>
      {children}
    </>
  )
}
