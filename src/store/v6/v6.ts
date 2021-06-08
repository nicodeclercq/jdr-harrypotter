import { pipe } from 'fp-ts/lib/function';
import * as IO from 'io-ts';
import { emptyRecord } from '../../helpers/object';

import { retrieveFromVersion } from '../helper';
import * as V5 from '../v5/v5';

export type Trait = V5.Trait;
export type UserSpell = V5.UserSpell;
export type Skills = V5.Skills;

const version = 'V6';

const notesDecoder = IO.array(IO.type({
  id: IO.string,
  title: IO.string,
  description: IO.string,
}));
const objectsDecoder = IO.record(IO.string, IO.number);
const moneyDecoder = IO.number;

export const stateDecoder = IO.intersection([
  V5.stateDecoder,
  IO.type({
    notes: notesDecoder,
    objects: objectsDecoder,
    money: moneyDecoder,
  })
]);

export type State = IO.TypeOf<typeof stateDecoder>;

function update(promise: Promise<V5.State>): Promise<State> {
  return promise
    .then((state) => ({
      ...state,
      notes: [],
      objects: emptyRecord<string, number>(),
      money: 0,
    }));
}

export function retrieve(currentState: unknown, name: string | undefined) {
  return retrieveFromVersion(
    version,
    currentState,
    stateDecoder,
    () => pipe(
      currentState,
      s => V5.retrieve(s, name),
      update,
    )
  );
}