import * as RemoteData from '@devexperts/remote-data-ts';
import { pipe } from 'fp-ts/function';

import { useStore } from '../../store/useStore';
import { equals } from '../../helpers/remoteData';
import { useDistinct } from '../../hooks/useDistinct';

export const useLockKey = () => {
  const { getState, setState } = useStore();
  const distinct = useDistinct(equals);

  const getLockKeys = () => {
    return pipe(
      getState(),
      RemoteData.map(state => state.lockKeys),
      distinct,
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