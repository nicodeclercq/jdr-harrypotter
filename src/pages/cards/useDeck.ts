import { pipe } from "fp-ts/function";
import * as RemoteData from "@devexperts/remote-data-ts";
import { shuffle } from "../../helpers/array";
import { lens, getPropertyCurried } from "../../helpers/object";
import { useStore } from "../../hooks/useStore";
import { Card, State } from "../../store/State";
import { deck } from "./deck";
import { useSocket } from "../../hooks/useSocket";
import { useRole } from "../../hooks/useRole";
import { sequence } from "../../helpers/remoteData";

const cardsLens = lens<State, "cards">("cards");

const INITIAL_CARD_NB_PER_USER = 5;

type Deck = State["cards"];

const isEqual = (c1: Card, c2: Card) =>
  c1.element === c2.element &&
  c1.mean === c2.mean &&
  c1.number === c2.number &&
  c1.type === c2.type;

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
          { newDeck: { table, deck, hand, drop }, remainingCards },
          card: Card
        ) =>
          remainingCards === 0
            ? {
                newDeck: {
                  deck: [...deck, card],
                  table,
                  drop,
                  hand,
                },
                remainingCards,
              }
            : {
                newDeck: {
                  deck,
                  table,
                  drop,
                  hand: [...hand, card],
                },
                remainingCards: remainingCards - 1,
              },
        {
          newDeck: {
            deck: [] as Deck["deck"],
            table: [] as Deck["table"],
            drop: [] as Deck["drop"],
            hand: [] as Deck["hand"],
          },
          remainingCards: cardsNb,
        } as Tmp
      ),
    (d) => d.newDeck
  );
};

export const useDeck = () => {
  const { isMJ } = useRole();
  const [cards, setCards] = useStore(cardsLens);
  const { emit } = useSocket();

  const reset = () =>
    pipe(
      cards,
      RemoteData.map(() => {
        const newCards = deal(deck, INITIAL_CARD_NB_PER_USER);
        setCards(newCards);
      })
    );

  const drawACard = () => {
    pipe(
      sequence({ isMJ, cards }),
      RemoteData.map(({ isMJ, cards: { deck, hand, drop, table } }) => {
        if (isMJ) {
          const [card, ...newDeck] = deck;
          setCards({
            deck: newDeck,
            hand: [...hand, card],
            drop,
            table,
          });
        } else {
          emit({ type: "drawCard" });
        }
      })
    );
  };
  const giveACard = (recipient: string) =>
    pipe(
      cards,
      RemoteData.map(({ deck, hand, table, drop }) => {
        const [card, ...newDeck] = deck;
        setCards({
          deck: newDeck,
          hand,
          drop,
          table,
        });

        emit({
          type: "giveACard",
          payload: {
            card,
            recipient,
          },
        });
      })
    );
  const playACard = (card: Card) =>
    pipe(
      cards,
      RemoteData.map(({ deck, hand, table, drop }) => {
        setCards({
          hand: hand.filter((c) => !isEqual(c, card)),
          table: [...table, card],
          drop,
          deck,
        });

        emit({
          type: "playACard",
          payload: card,
        });
      })
    );
  const clearCardTable = () =>
    pipe(
      cards,
      RemoteData.map(({ deck, hand, table, drop }) => {
        setCards({
          hand,
          table: [],
          drop: [...drop, ...table],
          deck,
        });

        emit({
          type: "clearCardTable",
        });
      })
    );

  const addCardToHand = (card: Card) => {
    pipe(
      cards,
      RemoteData.map(({ deck, hand, table, drop }) => {
        setCards({
          hand: [...hand, card],
          table,
          drop,
          deck,
        });
      })
    );
  };

  return {
    deck: pipe(cards, RemoteData.map(getPropertyCurried("deck"))),
    table: pipe(cards, RemoteData.map(getPropertyCurried("table"))),
    drop: pipe(cards, RemoteData.map(getPropertyCurried("drop"))),
    hand: pipe(cards, RemoteData.map(getPropertyCurried("hand"))),
    reset,
    drawACard,
    giveACard,
    playACard,
    clearCardTable,
    addCardToHand,
  };
};
