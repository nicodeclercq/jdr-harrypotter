import { pipe } from 'fp-ts/function';
import React, { useEffect } from 'react';
import * as RemoteData from '@devexperts/remote-data-ts';
import { useArithmancy } from './pages/arithmancy/useArithmancy';
import { useUser } from './pages/home/useUser';
import { useRune } from './pages/runes/useRune';
import { ExternalStore } from './store/ExternalStore';
import { useLocks } from './useLocks';
import { constVoid } from 'fp-ts/function';
import { useCallback } from 'react';
import { random } from './helpers/number';
import { useSocket } from './useSocket';

type Props = {
  children: React.ReactNode;
}

function Shortcuts() {
  const { getName } = useUser();
  const { setKnownRunes } = useRune();
  const { setKeys, unlock } = useLocks();
  const { setNumber } = useArithmancy();
  const { emit } = useSocket();
  
  const distributeRandomNumber = useCallback(() => {
    const currentUserName = getName();
    ExternalStore.getEntries()
      .then(names => pipe(
        currentUserName,
        RemoteData.map(curName => names.filter(n => n !== curName)),
        RemoteData.fold(
          constVoid,
          constVoid,
          constVoid,
          (filteredNames) => {
            const randomNumbers = filteredNames.map((_, i) => i+1).sort(() => random(-1, 1));
            filteredNames.forEach((name, index) => {
              emit({
                type: 'chat',
                payload: {
                  message: `n°${randomNumbers[index]}`,
                  recipient: name,
                  needsConfirmation: true,
                }
              })
            })
          },
        )
      ))
  }, [emit, getName]);

  useEffect(() => {
    // @ts-ignore
    window.app = {
      setKeys,
      setKnownRunes,
      unlock,
      getUserList: ExternalStore.getEntries,
      deleteUser: ExternalStore.delete,
      clear: () => {
        window.localStorage.removeItem('state');
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      },
      setNumber,
      distributeRandomNumber,
      chat: (message: string, recipient: string) => emit({
        type: 'chat',
        payload:{
          message, recipient, needsConfirmation: false,
        }
      }),
    }
  }, [setKeys, setKnownRunes, unlock, setNumber, distributeRandomNumber, emit]);

  return (
    <></>
  );
}

export function WindowShortcuts({children}: Props) {
  return (
    <>
    {children}
    <Shortcuts />
    </>
  )
}