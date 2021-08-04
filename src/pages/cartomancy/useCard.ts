import * as RemoteData from '@devexperts/remote-data-ts';
import { pipe } from 'fp-ts/lib/function';

import { useStore } from '../../store/useStore';
import { createArray } from '../../helpers/array';
import { useDistinct } from '../../hooks/useDistinct';
import { equals } from '../../helpers/remoteData';

export const useCard = () => {
  const { getState, setState } = useStore();
  const distinct = useDistinct(equals);

  const getCardsNumber = () => pipe(
    getState(),
    RemoteData.map(state => state.carthomancy.cardsNumber),
    distinct,
  )

  const getVisibleCards = () => {
    return pipe(
      getState(),
      RemoteData.map(state => state.carthomancy.visible),
      distinct,
    );
  };

  const getUsedCards = () => {
    return pipe(
      getState(),
      RemoteData.map(state => state.carthomancy.used),
      distinct,
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
          visible: createArray(state.carthomancy.cardsNumber).map(() => undefined)
        }
      })),
      setState,
    )
  };

  return {
    getCardsNumber,
    getVisibleCards,
    getUsedCards,
    revealCard,
    playCard,
    shuffleDeck,
  };
}