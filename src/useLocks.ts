import { pipe } from "fp-ts/function";
import * as RemoteData from '@devexperts/remote-data-ts';
import { useStore } from './store/useStore';

export const useLocks = () => {
  const { getState, setState } = useStore();

  const setKeys = (lockKeys: string[]) => pipe(
    getState(),
    RemoteData.map(
      state => ({
        ...state,
        lockKeys,
      })
    ),
    setState,
  )

  return {
    setKeys,
  }
}