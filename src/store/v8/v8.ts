import { pipe } from 'fp-ts/lib/function';
import * as IO from 'io-ts';

import { retrieveFromVersion } from '../helper';
import * as LastState from '../v7/v7';

const version = 'V8';

const itemDecoder = IO.type({
  name: IO.string,
  number: IO.number,
});

const potionsDecoder = IO.type({
  cookedPotions: IO.array(itemDecoder),
  emptyBottles: IO.number,
  ingredients: IO.array(itemDecoder),
});

const roleDecoder = IO.union([
  IO.literal('MJ'),
  IO.literal('Player'),
]);

export const stateDecoder = IO.intersection([
  LastState.stateDecoder,
  IO.type({
    potions: potionsDecoder,
    role: roleDecoder,
  }),
]);

export type State = IO.TypeOf<typeof stateDecoder>;

function update(promise: Promise<LastState.State>): Promise<State> {
  return promise
    .then((state) => ({
      ...state,
      potions: {
        cookedPotions: [],
        emptyBottles: 0,
        ingredients: [],
      },
      role: 'Player',
    }));
}

export function retrieve(currentState: unknown, name: string | undefined) {
  return retrieveFromVersion(
    version,
    currentState,
    stateDecoder,
    () => pipe(
      currentState,
      s => LastState.retrieve(s, name),
      update,
    )
  );
}