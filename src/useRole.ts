/* eslint-disable no-restricted-globals */
import { pipe } from "fp-ts/function";
import * as RemoteData from '@devexperts/remote-data-ts';
import { useStore } from './store/useStore';

export const useRole = () => {
  const { getState } = useStore();

  const isMJ = () => pipe(
    getState(),
    RemoteData.map(
      state => state.role === 'MJ'
    ),
  );

  const isPlayer = () => pipe(
    getState(),
    RemoteData.map(
      state => state.role === 'MJ'
    ),
  );

  return {
    isMJ,
    isPlayer,
  }
};