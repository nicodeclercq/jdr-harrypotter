import * as RemoteData from '@devexperts/remote-data-ts';

import { useStore } from '../../store/useStore';
import { pipe } from 'fp-ts/lib/function';
import { useDistinct } from '../../hooks/useDistinct';
import { equals } from '../../helpers/remoteData';


export const useObjects = () => {
  const { getState, setState } = useStore();
  const distinct = useDistinct(equals);

  const getObjects = () => {
    return pipe(
      getState(),
      RemoteData.map(state => state.objects),
      distinct,
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