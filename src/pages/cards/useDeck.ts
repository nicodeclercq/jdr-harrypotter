import { pipe } from "fp-ts/function";
import * as RemoteData from "@devexperts/remote-data-ts";
import { lens, getPropertyCurried } from "../../helpers/object";
import { createEmptyArray } from "../../helpers/array";
import { useStore } from "../../hooks/useStore";
import { Card, State } from "../../store/State";
import { deck } from "./deck";

const cardsLens = lens<State, "cards">("cards");

const INITIAL_CARD_NB_PER_USER = 5;

type Deck = State["cards"];

const shuffle = (cards: Card[]) =>
  [...cards].sort(() => (Math.random() < 0.5 ? -1 : 1));

const deal = (deck: Card[], cardsNb: number) => {
  type Tmp = {
    newDeck: Deck;
    remainingCards: number;
  };

  return pipe(
    shuffle(deck),
    (d) =>
      d.reduce(
        (
          { newDeck: { deck, hand, drop }, remainingCards }: Tmp,
          card: Card,
          index: number
        ) =>
          remainingCards === 0
            ? {
                newDeck: {
                  deck: [...deck, card],
                  drop,
                  hand,
                },
                remainingCards,
              }
            : {
                newDeck: {
                  deck,
                  drop,
                  hand: [...hand, card],
                },
                remainingCards: remainingCards - 1,
              },
        {
          newDeck: {
            deck: createEmptyArray<Deck["deck"]>(),
            drop: createEmptyArray<Deck["drop"]>(),
            hand: createEmptyArray<Deck["hand"]>(),
          },
          remainingCards: cardsNb,
        } as Tmp
      ),
    (d) => d.newDeck
  );
};

export const useDeck = () => {
  const [cards, setCards] = useStore(cardsLens);

  const reset = () =>
    pipe(
      cards,
      RemoteData.map(() => {
        const newCards = deal(deck, INITIAL_CARD_NB_PER_USER);

        setCards({
          deck: newCards.deck,
          hand: newCards.hand,
          drop: newCards.drop,
        });
      })
    );

  return {
    deck: pipe(
      cards,
      RemoteData.map(({ deck }) => deck)
    ),
    drop: pipe(cards, RemoteData.map(getPropertyCurried("drop"))),
    hand: pipe(cards, RemoteData.map(getPropertyCurried("hand"))),
    reset,
  };
};
