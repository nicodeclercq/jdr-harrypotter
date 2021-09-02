import { pipe } from 'fp-ts/lib/function';
import * as IO from 'io-ts';

import { omit } from '../../helpers/io-ts';
import { retrieveFromVersion } from '../helper';
import * as LastState from '../v8/v8';

const version = 'V9';

const userSpells = IO.type({
  userSpells: IO.type({
    knownSpells: IO.record(IO.string, IO.type({
      currentLevel: IO.number,
      uses: IO.number,
    })),
    points: IO.record(IO.string, IO.number),
  }),
});

export const stateDecoder = IO.intersection([
  omit(LastState.stateDecoder, 'userSpells'),
  userSpells
]);

export type State = Omit<IO.TypeOf<typeof LastState.stateDecoder>, 'userSpells'> & IO.TypeOf<typeof userSpells>;

function update(promise: Promise<LastState.State>): Promise<State> {
  return promise
    .then(({userSpells, ...state}) => state)
    .then((state) => ({
      ...state,
      userSpells: {
        knownSpells: {},
        points: {},
      }
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