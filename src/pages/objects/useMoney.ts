import * as RemoteData from '@devexperts/remote-data-ts';

import { useStore } from '../../store/useStore';
import { pipe } from 'fp-ts/lib/function';
import { useDistinct } from '../../hooks/useDistinct';
import { equals } from '../../helpers/remoteData';


export const useMoney = () => {
  const { getState, setState } = useStore();
  const distinct = useDistinct(equals);

  const getMoney = () => {
    return pipe(
      getState(),
      RemoteData.map(state => state.money),
      distinct
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

  const addMoney = (money: number) => {
    return pipe(
      getState(),
      RemoteData.map(state => ({
        ...state,
        money: state.money + money,
      })),
      setState,
    );
  }

  return {
    getMoney,
    setMoney,
    addMoney,
  }
}