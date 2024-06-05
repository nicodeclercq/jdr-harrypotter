import { pipe } from "fp-ts/lib/function";
import * as IO from "io-ts";

import { retrieveFromVersion } from "../helper";
import * as LastState from "../v13/v13";
import { omit } from "../../helpers/io-ts";
const version = "V14";

export const cardDecoder = IO.type({
  id: IO.string,
  category: IO.union([
    IO.literal("Attaque"),
    IO.literal("Défense"),
    IO.literal("Déplacement"),
    IO.literal("Parler"),
    IO.literal("Soin"),
    IO.literal("Création"),
    IO.literal("Analyse"),
  ]),
  title: IO.string,
  condition: IO.string,
  relatedSkill: IO.string,
  score: IO.number,
});

export const playedCardDecoder = IO.type({
  user: IO.type({
    name: IO.string,
    imageUrl: IO.union([IO.string, IO.undefined, IO.null]),
  }),
  card: cardDecoder,
});

export const stateDecoder = IO.intersection([
  omit(LastState.stateDecoder, "cards"),
  IO.type({
    cards: IO.type({
      table: IO.array(playedCardDecoder),
      hand: IO.array(cardDecoder),
    }),
    cardNb: IO.number,
  }),
]);

export type State = IO.TypeOf<typeof stateDecoder>;

function update(promise: Promise<LastState.State>): Promise<State> {
  return promise.then((state) => ({
    ...state,
    cards: {
      table: [],
      drop: [],
      hand: [],
    },
    cardNb: 3,
  }));
}

export function retrieve(currentState: unknown, name: string | undefined) {
  return retrieveFromVersion(version, currentState, stateDecoder, () =>
    pipe(currentState, (s) => LastState.retrieve(s, name), update)
  );
}
