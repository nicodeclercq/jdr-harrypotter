import { pipe } from "fp-ts/function";
import * as IO from "io-ts";

import { prompt } from "../../helpers/io";
import * as V2 from "../v2/v2";
import { Form as TraitForm } from "./Form";
import { Form } from "../../components/Form";
import { retrieveFromVersion } from "../helper";

const version = "V3";

export const userDecoder = V2.userDecoder;

const traitDecoder = IO.union([
  IO.literal("Charisme"),
  IO.literal("Constitution"),
  IO.literal("Dextérité"),
  IO.literal("Force"),
  IO.literal("Intelligence"),
  IO.literal("Perception"),
  IO.literal("Pouvoir"),
]);

export type UserSpell = {
  id: number;
  userPoints: V2.UserPoints;
  currentLevel: number;
  uses: number;
};

export type Trait = IO.TypeOf<typeof traitDecoder>;

export const traitsDecoder = IO.record(traitDecoder, IO.number);

export const gameDecoder = IO.union([IO.literal("HP"), IO.literal("FANTASY")]);
export type Game = IO.TypeOf<typeof gameDecoder>;
export const GAME = {
  HP: "HP",
  FANTASY: "FANTASY",
} as const;

export const stateDecoder = IO.intersection([
  V2.stateDecoder,
  IO.type({
    traits: traitsDecoder,
  }),
  IO.type({
    game: gameDecoder,
  }),
]);

export type State = IO.TypeOf<typeof stateDecoder>;

function update(promise: Promise<V2.State>): Promise<State> {
  return promise
    .then((state) =>
      prompt<V2.State & { game: Game }>(
        (callback) => (
          <Form
            fields={{
              game: {
                label: "Type de jeu",
                defaultValue: "HP",
                values: [
                  { label: "HP", value: GAME.HP },
                  { label: "Fantasy", value: GAME.FANTASY },
                ],
              },
            }}
            onSubmit={({ game }) => callback({ ...state, game: game as Game })}
          />
        ),
        <>Type de Jeu</>
      )
    )
    .then((state) =>
      prompt<State>(
        (callback) => (
          <TraitForm
            game={state.game}
            callback={(traits) => callback({ ...state, ...traits })}
          />
        ),
        <>Caractéristiques de mon Personnage ({state.game})</>
      )
    );
}

export function retrieve(currentState: unknown, name: string | undefined) {
  return retrieveFromVersion(version, currentState, stateDecoder, () =>
    pipe(currentState, (s) => V2.retrieve(s, name), update)
  );
}
