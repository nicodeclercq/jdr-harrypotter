import { pipe } from "fp-ts/lib/function";
import * as IO from "io-ts";

import { spells } from "../../pages/spells/spells";
import { retrieveFromVersion } from "../helper";
import * as V1 from "../v1/v1";

const version = "V2";

export const elementDecoder = V1.elementDecoder;
export const userDecoder = V1.userDecoder;
export type UserPoints = Record<V1.Element, number>;

export const userSpellsDecoder = IO.type({
  knownSpells: IO.record(IO.string, IO.type({
    currentLevel: IO.number,
    uses: IO.number,
  })),
  points: IO.record(IO.string, IO.number),
});

export const stateDecoder = IO.type({
  user: V1.userDecoder,
  userSpells: userSpellsDecoder,
});

export type State = IO.TypeOf<typeof stateDecoder>;

export const defaultUserSpells: State["userSpells"] = {
  knownSpells: {},
  points:{},
};

function update(promise: Promise<V1.State>): Promise<State> {
  return promise.then((state) => {
    const spellList = Object.values(spells);
    const knownSpells = state.userSpells
      .map((spell) => {
        const id = spellList.findIndex((spellFromList) => spellFromList.name === spell.name);
        return ({
          id,
          usePoints: {},
        });
      });

    return knownSpells.reduce(
      (acc, {id, usePoints}) => {
        return {
          ...acc,
          [id]: {id, usePoints},
        };
      },
      {...state, userSpells: defaultUserSpells}
    );
  });
}

export function retrieve(currentState: unknown, name: string | undefined) {
  return retrieveFromVersion(
    version,
    currentState,
    stateDecoder,
    () => pipe(
      currentState,
      s => V1.retrieve(s, name),
      update,
    )
  );
}