import * as RemoteData from '@devexperts/remote-data-ts';

import { useStore } from '../../store/useStore';
import { pipe } from 'fp-ts/lib/function';

export const useCard = () => {
  const { getState, setState } = useStore();

  const getVisibleCards = () => {
    return pipe(
      getState(),
      RemoteData.map(state => state.carthomancy.visible),
    );
  };

  const getUsedCards = () => {
    return pipe(
      getState(),
      RemoteData.map(state => state.carthomancy.used),
    );
  };

  const revealCard = (selected: number, index: number) => {
    return pipe(
      getState(),
      RemoteData.map(state => ({
        ...state,
        carthomancy: {
          ...state.carthomancy,
          visible: state.carthomancy.visible.map((v, i) =>
            i === selected
              ? index
              : v
          ),
        }
      })),
      setState,
    )
  };

  const playCard = (selected: number, index: number) => {
    return pipe(
      getState(),
      RemoteData.map(state => ({
        ...state,
        carthomancy: {
          ...state.carthomancy,
          visible: state.carthomancy.visible.map((v, i) =>
            i === selected
              ? undefined
              : v
          ),
          used: [...state.carthomancy.used, index],
        }
      })),
      setState,
    )
  };

  const shuffleDeck = () => {
    return pipe(
      getState(),
      RemoteData.map(state => ({
        ...state,
        carthomancy: {
          ...state.carthomancy,
          used: [],
          visible: [
            undefined,
            undefined,
            undefined,
          ]
        }
      })),
      setState,
    )
  };

  return {
    getVisibleCards,
    getUsedCards,
    revealCard,
    playCard,
    shuffleDeck,
  };
}