import { pipe } from 'fp-ts/lib/function';
import * as IO from 'io-ts';
import { merge } from '../helpers/object';

import { getSpellPoints } from './../pages/spells/domain/Spell';
import { spells } from './../pages/spells/spells';
import { retrieveFromVersion } from './helper';
import * as V1 from './v1';

export const elementDecoder = V1.elementDecoder;
export type UserPoints = Record<V1.Element, number>;

export type State = {
  userSpells: Record<
    string,
    {
      id: number;
      userPoints: Record<V1.Element, number>;
    }
  >
};

export const defaultState: State = {
  userSpells: {}
};

const stateDecoder = IO.strict({
  userSpells: IO.record(
    IO.string,
    IO.strict({
      id: IO.number,
      userPoints: IO.record(elementDecoder, IO.number),
    })
  ),
});

function update(promise: Promise<V1.State>): Promise<State> {
  return promise.then((state) => {
    const spellList = Object.values(spells);
    const knownSpells = state.userSpells
      .map((spell) => {
        const id = spellList.findIndex((spellFromList) => spellFromList.name === spell.name);
        return ({
          id,
          usePoints: merge(getSpellPoints(spells[id]), state.uses, (a, b) => a + b),
        });
      });

      return knownSpells.reduce(
        (acc, {id, usePoints}) => {
          return {
            ...acc,
            [id]: {id, usePoints},
          };
        },
        defaultState
      );
    });
}

export function retrieve(currentState: unknown): Promise<State> {
  return retrieveFromVersion(
    'V2',
    currentState,
    stateDecoder,
    () => pipe(
      currentState,
      V1.retrieve,
      update
    )
  );
}