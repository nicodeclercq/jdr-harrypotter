import React, { useEffect } from 'react';
import * as RemoteData from '@devexperts/remote-data-ts';
import { pipe, constVoid } from 'fp-ts/function';
import { useArithmancy } from './pages/arithmancy/useArithmancy';
import { useUser } from './pages/home/useUser';
import { useRune } from './pages/runes/useRune';
import { ExternalStore } from './store/ExternalStore';
import { useLocks } from './useLocks';
import { useCallback } from 'react';
import { random } from './helpers/number';
import { useSocket } from './useSocket';
import { useSkill } from './pages/skills/useSkill';

export function WindowShortcuts() {
  const { getName } = useUser();
  const { setKnownRunes } = useRune();
  const { setKeys, unlock } = useLocks();
  const { setNumber } = useArithmancy();
  const { emit } = useSocket();
  const { add: addSkill, remove: removeSkill} = useSkill();
  
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
      addSkill,
      removeSkill,
    }
  }, [setKeys, setKnownRunes, unlock, setNumber, distributeRandomNumber, emit, addSkill, removeSkill]);

  return (
    <></>
  );
}