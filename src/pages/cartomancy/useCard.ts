import * as RemoteData from "@devexperts/remote-data-ts";
import { pipe } from "fp-ts/lib/function";

import { useStore } from "../../hooks/useStore";
import { createArray } from "../../helpers/array";
import { stateLens } from "../../store/State";
import { onSuccess } from "../../helpers/remoteData";

const carthomancyLens = stateLens.fromProperty("carthomancy");

export const useCard = () => {
  const [carthomancy, setCarthomancy] = useStore(carthomancyLens);

  const getCardsNumber = () =>
    pipe(
      carthomancy,
      RemoteData.map(({ cardsNumber }) => cardsNumber)
    );

  const getVisibleCards = () => {
    return pipe(
      carthomancy,
      RemoteData.map(({ visible }) => visible)
    );
  };

  const setVisibleCards = (number: number) =>
    pipe(
      carthomancy,
      onSuccess((carthomancy) =>
        setCarthomancy({
          ...carthomancy,
          cardsNumber: number,
        })
      )
    );

  const getUsedCards = () => {
    return pipe(
      carthomancy,
      RemoteData.map(({ used }) => used)
    );
  };

  const revealCard = (selected: number, index: number) => {
    return pipe(
      carthomancy,
      onSuccess((carthomancy) =>
        setCarthomancy({
          ...carthomancy,
          visible: carthomancy.visible.map((v, i) =>
            i === selected ? index : v
          ),
        })
      )
    );
  };

  const playCard = (selected: number, index: number) => {
    return pipe(
      carthomancy,
      onSuccess((carthomancy) =>
        setCarthomancy({
          ...carthomancy,
          visible: carthomancy.visible.map((v, i) =>
            i === selected ? undefined : v
          ),
          used: [...carthomancy.used, index],
        })
      )
    );
  };

  const shuffleDeck = () => {
    return pipe(
      carthomancy,
      onSuccess((carthomancy) =>
        setCarthomancy({
          ...carthomancy,
          used: [],
          visible: createArray(carthomancy.cardsNumber, 0).map(() => undefined),
        })
      )
    );
  };

  return {
    getCardsNumber,
    getVisibleCards,
    getUsedCards,
    setVisibleCards,
    revealCard,
    playCard,
    shuffleDeck,
  };
};
