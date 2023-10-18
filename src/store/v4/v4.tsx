import { pipe } from "fp-ts/lib/function";
import * as IO from "io-ts";

import { prompt } from "../../helpers/io";
import { retrieveFromVersion } from "../helper";
import * as V3 from "../v3/v3";
import { Form } from "./Form";

export type Trait = V3.Trait;
export type UserSpell = V3.UserSpell;

const version = "V4";

export const skillDecoder = IO.type({
  currentLevel: IO.number,
});

export const skillsDecoder = IO.record(IO.string, skillDecoder);

export const lifeDecoder = IO.type({
  life: IO.type({
    current: IO.number,
    max: IO.number,
  }),
});

export const stateDecoder = IO.intersection([
  V3.stateDecoder,
  IO.type({
    skills: skillsDecoder,
  }),
  lifeDecoder,
]);

export type State = IO.TypeOf<typeof stateDecoder>;
export type Skills = IO.TypeOf<typeof skillsDecoder>;

function update(promise: Promise<V3.State>): Promise<State> {
  return promise
    .then((state) => ({
      ...state,
      life: {
        current: Math.round(state.traits.Constitution),
        max: Math.round(state.traits.Constitution),
      },
    }))
    .then((state) =>
      prompt<State>(
        (callback) => (
          <Form
            state={state}
            callback={(skills) => callback({ ...state, ...skills })}
          />
        ),
        <>Compétences de mon Personnage</>
      )
    )
    .then((state) => ({
      ...state,
    }));
}

export function retrieve(currentState: unknown, name: string | undefined) {
  return retrieveFromVersion(version, currentState, stateDecoder, () =>
    pipe(currentState, (s) => V3.retrieve(s, name), update)
  );
}
