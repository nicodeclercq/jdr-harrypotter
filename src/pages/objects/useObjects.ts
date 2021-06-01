import * as RemoteData from '@devexperts/remote-data-ts';

import { useStore } from '../../store/useStore';
import { pipe } from 'fp-ts/lib/function';


export const useObjects = () => {
  const { getState, setState } = useStore();

  const getObjects = () => {
    return pipe(
      getState(),
      RemoteData.map(state => state.objects),
    );
  }

  const setObjects = (objects: Record<string, number>) => {
    return pipe(
      getState(),
      RemoteData.map(state => ({
        ...state,
        objects
      })),
      setState,
    );
  }

  return {
    getObjects,
    setObjects,
  }
}