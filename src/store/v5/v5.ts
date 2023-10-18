import { pipe } from "fp-ts/lib/function";
import * as IO from "io-ts";
import { map } from "../../helpers/object";

import { retrieveFromVersion } from "../helper";
import * as V4 from "../v4/v4";
import * as V3 from "../v3/v3";

export type Trait = V4.Trait;
export type UserSpell = V4.UserSpell;
export type Skills = V4.Skills;

const version = "V5";

const lockKeysDecoder = IO.array(IO.string);
const runesDefinitionDecoder = IO.record(IO.string, IO.string);
const skillDecoder = IO.type({
  skills: IO.record(
    IO.string,
    IO.intersection([
      V4.skillDecoder,
      IO.type({uses: IO.number})
    ]),
  )
});

export const stateDecoder = IO.intersection([
  V3.stateDecoder,
  V4.lifeDecoder,
  skillDecoder,
  IO.type({
    lockKeys: lockKeysDecoder,
  }),
  IO.type({
    runesDefinition: runesDefinitionDecoder,
    knownRunes: IO.array(IO.string),
  })
]);

export type State = IO.TypeOf<typeof stateDecoder>;

function update(promise: Promise<V4.State>): Promise<State> {
  return promise
    .then((state) => ({
      ...state,
      skills: map(({currentLevel}) => ({uses: 0, currentLevel}), state.skills),
    }))
    .then((state) => ({
      ...state,
      lockKeys: [],
      runesDefinition: {},
      knownRunes: [],
    }));
}

export function retrieve(currentState: unknown, name: string | undefined) {
  return retrieveFromVersion(
    version,
    currentState,
    stateDecoder,
    () => pipe(
      currentState,
      s => V4.retrieve(s, name),
      update,
    )
  );
}