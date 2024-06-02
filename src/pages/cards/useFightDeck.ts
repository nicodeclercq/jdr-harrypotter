import { pipe } from "fp-ts/function";
import * as RemoteData from "@devexperts/remote-data-ts";
import { getNRandomFromArray } from "../../helpers/array";
import { sequence } from "../../helpers/remoteData";
import { useSkill } from "../skills/useSkill";
import {
  cards as fightCards,
  Card as FightCard,
} from "../../store/v14/fightCards";
import { useState } from "react";
import { random } from "../../helpers/number";
import { stateLens } from "../../store/State";
import { useStore } from "../../hooks/useStore";
import { useUser } from "../home/useUser";
import { useSocket } from "../../hooks/useSocket";

const CARDS_NB_IN_HAND = 5;

const tableLens = stateLens.fromPath(["cards", "table"]);
const handLens = stateLens.fromPath(["cards", "hand"]);

const getRandomCard = (hand: FightCard[], deck: FightCard[]): FightCard => {
  const newCard = deck[random(0, deck.length - 1)];

  return hand.find((c) => c.id === newCard.id)
    ? getRandomCard(hand, deck)
    : newCard;
};

const reset = (
  skills: RemoteData.RemoteData<Error, Record<string, { currentLevel: number }>>
) =>
  pipe(
    skills,
    RemoteData.map((skills) =>
      Object.entries(skills)
        .map(([name, { currentLevel }]) =>
          name in fightCards
            ? getNRandomFromArray(
                Math.floor(currentLevel / 10),
                fightCards[name]
              )
            : []
        )
        .flat()
    )
  );

export const useFightDeck = () => {
  const { emit } = useSocket();
  const { user } = useUser();
  const { getSkills } = useSkill();
  const [hand, setHand] = useStore(handLens);
  const [table, setTable] = useStore(tableLens);

  const getHand = () =>
    pipe(
      deck,
      RemoteData.map((deck) => getNRandomFromArray(CARDS_NB_IN_HAND, deck))
    );

  const [deck, setDeck] = useState(reset(getSkills()));

  const changeTable = (
    newTable: {
      card: FightCard;
      user: { name: string; imageUrl: string | null | undefined };
    }[]
  ) => setTable(newTable);

  const playACard = (card: FightCard) => {
    // update table
    pipe(
      user,
      RemoteData.map((user) => {
        pipe(
          table,
          RemoteData.map((table) => [...table, { user, card }]),
          RemoteData.map((newTable) => {
            emit({
              type: "setCardsTable",
              payload: newTable,
            });
            setTable(newTable);
          })
        );

        /*
         */
      })
    );

    // update hand
    pipe(
      sequence({ deck, hand }),
      RemoteData.map(({ deck, hand }) => {
        const newCard = getRandomCard(hand, deck);
        return hand.map((c) => (card === c ? newCard : c));
      }),
      RemoteData.map(setHand)
    );
  };

  const pick = () => pipe(getHand(), RemoteData.map(setHand));
  const clearTable = () => {
    setTable([]);
    emit({
      type: "setCardsTable",
      payload: [],
    });
  };

  const resetAll = () => {
    pipe(getSkills(), reset, setDeck);
    setTable([]);
  };

  return {
    table,
    deck,
    hand,
    playACard,
    pick,
    clearTable,
    changeTable,
    reset: resetAll,
  };
};
