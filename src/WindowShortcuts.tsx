import React, { useEffect } from 'react';
import * as RemoteData from '@devexperts/remote-data-ts';
import { pipe, constVoid } from 'fp-ts/function';
import { useArithmancy } from './pages/arithmancy/useArithmancy';
import { useUser } from './pages/home/useUser';
import { useRune } from './pages/runes/useRune';
import { ExternalStore } from './store/ExternalStore';
import { useLockKey } from './hooks/useLockKey';
import { useCallback } from 'react';
import { random } from './helpers/number';
import { useSocket } from './hooks/useSocket';
import { useSkill } from './pages/skills/useSkill';

export function WindowShortcuts() {
  const { name } = useUser();
  const { setKnownRunes, learnAllRunes, setAllRunesDefinition } = useRune();
  const { setLockKeys: setKeys, unlock } = useLockKey();
  const { setNumber } = useArithmancy();
  const { emit } = useSocket();
  const { add: addSkill, remove: removeSkill} = useSkill();
  
  const distributeRandomNumber = useCallback(() => {
    const currentUserName = name;
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
  }, [emit, name]);

  useEffect(() => {
    // @ts-ignore
    window.app = {
      setKeys,
      setKnownRunes,
      learnAllRunes,
      setAllRunesDefinition,
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
  }, [learnAllRunes, setAllRunesDefinition, setKeys, setKnownRunes, unlock, setNumber, distributeRandomNumber, emit, addSkill, removeSkill]);

  return (
    <></>
  );
}