import { pipe } from 'fp-ts/function';
import * as IO from 'io-ts';

import { prompt } from '../../helpers/io';
import { map } from '../../helpers/object';
import * as V2 from '../v2';
import { Form } from './Form';
import { retrieveFromVersion } from '../helper';

const elementDecoder = V2.elementDecoder;

export type Trait = 'Force' | 'Constitution' | 'Taille' | 'Perception' | 'Intelligence' | 'Dextérité' | 'Apparence' | 'Pouvoir';

export type UserSpell = {
  id: number;
  userPoints: V2.UserPoints;
  currentLevel: number;
  uses: number;
};

export type State = {
  userSpells: Record<
    string,
    UserSpell
  >,
  traits: Record<
    Trait,
    number
  >
};

const stateDecoder = IO.strict({
  userSpells: IO.record(
    IO.string,
    IO.strict({
      id: IO.number,
      userPoints: IO.record(elementDecoder, IO.number),
      currentLevel: IO.number,
      uses: IO.number,
    })
  ),
  traits: IO.record(
    IO.union([
      IO.literal('Force'),
      IO.literal('Constitution'),
      IO.literal('Taille'),
      IO.literal('Perception'),
      IO.literal('Intelligence'),
      IO.literal('Dextérité'),
      IO.literal('Apparence'),
      IO.literal('Pouvoir'),
    ]),
    IO.number,
  )
});

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

export function retrieve(currentState: unknown): Promise<State> {
  return retrieveFromVersion(
    'V3',
    currentState,
    stateDecoder,
    () => pipe(
      currentState,
      V2.retrieve,
      update
    )
  );
}