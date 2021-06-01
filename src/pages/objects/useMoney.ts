import * as RemoteData from '@devexperts/remote-data-ts';

import { useStore } from '../../store/useStore';
import { pipe } from 'fp-ts/lib/function';


export const useMoney = () => {
  const { getState, setState } = useStore();

  const getMoney = () => {
    return pipe(
      getState(),
      RemoteData.map(state => state.money),
    );
  }

  const setMoney = (money: number) => {
    return pipe(
      getState(),
      RemoteData.map(state => ({
        ...state,
        money
      })),
      setState,
    );
  }

  return {
    getMoney,
    setMoney,
  }
}