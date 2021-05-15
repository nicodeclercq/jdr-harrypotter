import * as RemoteData from '@devexperts/remote-data-ts';
import { useStore } from './../../store/useStore';


export const useLife = () => {
  const { getState, setState } = useStore();
  /*
  const getLife = () => `${state.life.current} / ${state.life.max}`;

  const setLife = (newValue: number) => pipe(
    getState(),
    RemoteData.map(state => state)
    setState()

  return {
    getLife,
    setLife,
  }
  */
} 