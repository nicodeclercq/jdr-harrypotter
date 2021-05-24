import * as RemoteData from '@devexperts/remote-data-ts';

import { useStore } from '../../store/useStore';
import { pipe } from 'fp-ts/lib/function';


export const useLife = () => {
  const { getState, setState } = useStore();

  const getUserLife = () => {
    return pipe(
      getState(),
      RemoteData.map(state => state.life),
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