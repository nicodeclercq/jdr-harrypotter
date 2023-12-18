import { pipe } from "fp-ts/function";
import * as RemoteData from "@devexperts/remote-data-ts";
import { shuffle } from "../../helpers/array";
import { useStore } from "../../hooks/useStore";
import { Card, State, stateLens } from "../../store/State";
import { useSocket } from "../../hooks/useSocket";
import { useRole } from "../../hooks/useRole";
import { sequence } from "../../helpers/remoteData";

const cardsLens = stateLens.fromProperty("cards");
const deckLens = stateLens.fromPath(["cards", "deck"]);
const tableLens = stateLens.fromPath(["cards", "table"]);
const handLens = stateLens.fromPath(["cards", "hand"]);
const dropLens = stateLens.fromPath(["cards", "drop"]);

type Deck = State["cards"];

const isEqual = (c1: Card) => (c2: Card) =>
  c1.element === c2.element &&
  c1.mean === c2.mean &&
  c1.number === c2.number &&
  c1.type === c2.type;

const not =
  <A>(predicate: (a: A) => boolean) =>
  (a: A) =>
    !predicate(a);

const deal = (deck: Card[]) => {
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
          remainingCards: 0,
        } as Tmp
      ),
    (d) => d.newDeck
  );
};

export const useDeck = () => {
  const { isMJ } = useRole();
  const [_cards, setCards] = useStore(cardsLens);
  const [deck, setDeck] = useStore(deckLens);
  const [hand, setHand] = useStore(handLens);
  const [drop, setDrop] = useStore(dropLens);
  const [table, setTable] = useStore(tableLens);

  const { emit } = useSocket();

  const store = {
    draw: () =>
      pipe(
        deck,
        RemoteData.map((deck) => {
          const [card, ...newDeck] = deck;
          return {
            card,
            newDeck,
          };
        })
      ),
  };

  const reset = () =>
    pipe(
      sequence({ isMJ, deck }),
      RemoteData.map(({ isMJ, deck }) => {
        if (isMJ) {
          pipe(deck, deal, setCards);

          emit({
            type: "resetCards",
            cards: { deck: [], drop: [], hand: [], table: [] },
          });
        }
      })
    );

  const drawACard = () =>
    pipe(
      sequence({ isMJ, hand, draw: store.draw() }),
      RemoteData.map(({ isMJ, hand, draw: { card, newDeck } }) => {
        if (isMJ) {
          setDeck(newDeck);
          setHand([...hand, card]);
        } else {
          emit({ type: "drawCard" });
        }
      })
    );

  const giveACard = (recipient: string) =>
    pipe(
      sequence({ isMJ, draw: store.draw() }),
      RemoteData.map(({ isMJ, draw: { card, newDeck } }) => {
        if (isMJ) {
          emit({
            type: "giveACard",
            payload: {
              card,
              recipient,
            },
          });
          setDeck(newDeck);
        }
      })
    );

  const playACard = (card: Card) => {
    pipe(
      sequence({ hand, table }),
      RemoteData.map(({ hand, table }) => {
        setHand(hand.filter(not(isEqual(card))));
        setTable(isMJ ? [...table, card] : table);
      })
    );

    emit({
      type: "playACard",
      payload: card,
    });
  };

  const clearCardTable = () =>
    pipe(
      sequence({ isMJ, drop, table }),
      RemoteData.map(({ isMJ, table, drop }) => {
        setTable([]);
        setDrop([...drop, ...table]);

        if (isMJ) {
          emit({
            type: "clearCardTable",
          });
        }
      })
    );

  const addCardToHand = (card: Card) => {
    pipe(
      hand,
      RemoteData.map((hand) => {
        setHand([...hand, card]);
      })
    );
  };
  const addCardToTable = (card: Card) => {
    pipe(
      table,
      RemoteData.map((table) => {
        setTable([...table, card]);
      })
    );
  };

  return {
    deck,
    table,
    drop,
    hand,
    setCards,
    reset,
    drawACard,
    giveACard,
    playACard,
    addCardToTable,
    clearCardTable,
    addCardToHand,
  } as const;
};
