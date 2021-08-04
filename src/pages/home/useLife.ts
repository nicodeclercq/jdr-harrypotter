import * as RemoteData from '@devexperts/remote-data-ts';

import { useStore } from '../../store/useStore';
import { pipe } from 'fp-ts/lib/function';
import { equals } from '../../helpers/remoteData';
import { useDistinct } from '../../hooks/useDistinct';


export const useLife = () => {
  const { getState, setState } = useStore();
  const distinct = useDistinct(equals);

  const getUserLife = () => {
    return pipe(
      getState(),
      RemoteData.map(state => state.life),
      distinct,
    );
  }

  const setUserLife = (life: {current: number, max: number}) => {
    return pipe(
      getState(),
      RemoteData.map(state => ({
        ...state,
        life
      })),
      setState,
    );
  }

  return {
    getUserLife,
    setUserLife,
  }
}