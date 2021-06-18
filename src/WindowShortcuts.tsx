import React, { useEffect } from 'react';
import { useArithmancy } from './pages/arithmancy/useArithmancy';
import { useRune } from './pages/runes/useRune';
import { ExternalStore } from './store/ExternalStore';
import { useLocks } from './useLocks';

type Props = {
  children: React.ReactNode;
}

export function WindowShortcuts({children}: Props) {
  const { setKnownRunes } = useRune();
  const { setKeys, unlock } = useLocks();
  const { setNumber } = useArithmancy();

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
    }
  }, [setKeys, setKnownRunes, unlock, setNumber]);

  return (
    <>
     {children} 
    </>
  );
}