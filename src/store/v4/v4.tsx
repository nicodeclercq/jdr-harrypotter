import { pipe } from 'fp-ts/lib/function';
import * as IO from 'io-ts';

import { prompt } from '../../helpers/io';
import * as V3 from '../v3/v3';
import { Form } from './Form';

export type Trait = V3.Trait;
export type UserSpell = V3.UserSpell;

const skillsDecoder = IO.record(
  IO.string,
  IO.strict({
    currentLevel: IO.number,
  })
);

const stateDecoder = IO.strict({
  userSpells: V3.userSpellsDecoder,
  traits: V3.traitsDecoder,
  skills: skillsDecoder,
});

export type State = IO.TypeOf<typeof stateDecoder>;
export type Skills = IO.TypeOf<typeof skillsDecoder>;

function update(promise: Promise<V3.State>): Promise<State> {
  return promise
    .then((state) => prompt<State>((callback) => (
        <Form callback={(skills) => callback({...state, ...skills})} />
    ), <>Compétences de mon Personnage</>))
    .then((state) => ({
      ...state,
    }));
}

export function retrieve(currentState: unknown): Promise<State> {
  return stateDecoder.is(currentState)
    ? Promise.resolve(currentState)
    : pipe(
        currentState,
        V3.retrieve,
        update
      );
}