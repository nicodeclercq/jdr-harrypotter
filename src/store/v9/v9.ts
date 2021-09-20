import { pipe } from 'fp-ts/lib/function';
import * as IO from 'io-ts';

import { retrieveFromVersion } from '../helper';
import * as LastState from '../v8/v8';

const version = 'V9';



export const stateDecoder = IO.intersection([
  LastState.stateDecoder,
  IO.type({
    lastUpdate: IO.union([IO.string, IO.undefined, IO.null]),
  }),
]);

export type State = IO.TypeOf<typeof stateDecoder>;

function update(promise: Promise<LastState.State>): Promise<State> {
  return promise
    .then((state) => ({
      ...state,
      lastUpdate: undefined,
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