import React, { useEffect } from 'react';
import { useRune } from './pages/runes/useRune';
import { ExternalStore } from './store/ExternalStore';
import { useLocks } from './useLocks';

type Props = {
  children: React.ReactNode;
}

export function WindowShortcuts({children}: Props) {
  const { setKnownRunes } = useRune();
  const { setKeys } = useLocks();

  useEffect(() => {
    // @ts-ignore
    window.app = {
      setKeys,
      setKnownRunes,
      getUserList: ExternalStore.getEntries,
      deleteUser: ExternalStore.delete,
      clear: () => {
        window.localStorage.removeItem('state');
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      }
    }
  }, [setKeys, setKnownRunes]);

  return (
    <>
     {children} 
    </>
  );
}