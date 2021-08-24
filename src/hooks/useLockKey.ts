import { pipe } from 'fp-ts/function';
import * as RemoteData from '@devexperts/remote-data-ts';

import { removeDupplicates } from '../helpers/array';
import { useStore } from './useStore';
import { State } from '../store/State';
import { onSuccess } from '../helpers/remoteData';
import { lens } from '../helpers/object';

const lockKeysLens = lens<State, 'lockKeys'>('lockKeys');

export const useLockKey = () => {
  const [ lockKeys, setLockKeys ] = useStore(lockKeysLens);

  const unlock = (lockKey: string) => pipe(
    lockKeys,
    onSuccess(currentKeys => setLockKeys(
      removeDupplicates([...currentKeys, lockKey])
    ))
  );

  const isUnlocked = (lockKey: string) => {
    return pipe(
      lockKeys,
      RemoteData.map(lockKeys => lockKeys.includes(lockKey)),
    );
  }

  return {
    lockKeys,
    setLockKeys,
    unlock,
    isUnlocked,
  }
}