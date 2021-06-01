import * as RemoteData from '@devexperts/remote-data-ts';

import { useStore } from '../../store/useStore';
import { pipe } from 'fp-ts/lib/function';


export const useLockKey = () => {
  const { getState, setState } = useStore();

  const getLockKeys = () => {
    return pipe(
      getState(),
      RemoteData.map(state => state.lockKeys),
    );
  }

  const setLockKeys = (lockKeys: string[]) => {
    return pipe(
      getState(),
      RemoteData.map(state => ({
        ...state,
        lockKeys
      })),
      setState,
    );
  }

  const isUnlocked = (lockKey: string) => {
    return pipe(
      getState(),
      RemoteData.map(state => state.lockKeys.includes(lockKey)),
    );
  }

  return {
    getLockKeys,
    setLockKeys,
    isUnlocked,
  }
}