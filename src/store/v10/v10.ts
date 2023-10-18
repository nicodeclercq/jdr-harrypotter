import { pipe } from "fp-ts/lib/function";
import * as IO from "io-ts";

import { retrieveFromVersion } from "../helper";
import * as LastState from "../v9/v9";

const version = "V10";

export const stateDecoder = IO.intersection([
  LastState.stateDecoder,
  IO.type({
    bennies: IO.array(IO.type({
      x: IO.number,
      y: IO.number,
    })),
  }),
]);

export type State = IO.TypeOf<typeof stateDecoder>;

function update(promise: Promise<LastState.State>): Promise<State> {
  return promise
    .then((state) => ({
      ...state,
      bennies: [
        {x: 45, y: 50},
        {x: 50, y: 50},
        {x: 55, y: 50},
      ],
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