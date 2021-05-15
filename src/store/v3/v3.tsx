import { pipe } from 'fp-ts/function';
import * as IO from 'io-ts';

import { prompt } from '../../helpers/io';
import { map } from '../../helpers/object';
import * as V2 from '../v2/v2';
import { Form } from './Form';
import { retrieveFromVersion } from '../helper';

const version = 'V3';

export const userDecoder = V2.userDecoder;

export const userSpellsDecoder = IO.record(
  IO.string,
  IO.strict({
    id: IO.number,
    userPoints: IO.record(V2.elementDecoder, IO.number),
    currentLevel: IO.number,
    uses: IO.number,
  })
);

const traitDecoder = IO.union([
  IO.literal('Force'),
  IO.literal('Constitution'),
  IO.literal('Taille'),
  IO.literal('Perception'),
  IO.literal('Intelligence'),
  IO.literal('Dextérité'),
  IO.literal('Apparence'),
  IO.literal('Pouvoir'),
]);

export type UserSpell = {
  id: number;
  userPoints: V2.UserPoints;
  currentLevel: number;
  uses: number;
};

export type Trait = IO.TypeOf<typeof traitDecoder>;

export const traitsDecoder = IO.record(
  traitDecoder,
  IO.number,
);

export const stateDecoder = IO.intersection([
  V2.stateDecoder,
  IO.type({
    userSpells: userSpellsDecoder,
    traits: traitsDecoder,
  })
]);

export type State = IO.TypeOf<typeof stateDecoder>;

function update(promise: Promise<V2.State>): Promise<State> {
  return promise
    .then((state) => prompt<V2.State & {traits: Record<Trait, number>}>((callback) => (
        <Form callback={(traits) => callback({...state, ...traits})} />
    ), <>Caractéristiques de mon Personnage</>))
    .then((state) => ({
      ...state,
      userSpells: map((spell) => ({
        ...spell,
        currentLevel: state.traits.Pouvoir * 5,
        uses: 0,
      }), state.userSpells),
    }));
}

export function retrieve(currentState: unknown, name: string | undefined) {
  return retrieveFromVersion(
    version,
    currentState,
    stateDecoder,
    () => pipe(
      currentState,
      s => V2.retrieve(s, name),
      update,
    )
  );
}