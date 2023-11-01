import { pipe } from "fp-ts/lib/function";
import * as IO from "io-ts";
import { prompt } from "../../helpers/io";
import { Form } from "./Form";

import { retrieveFromVersion } from "../helper";
import * as LastState from "../v10/v10";

const version = "V11";

export const stateDecoder = LastState.stateDecoder;

export type State = IO.TypeOf<typeof stateDecoder>;

function update(promise: Promise<LastState.State>): Promise<State> {
  return promise.then((state) => {
    if (state.lockKeys == null || state.lockKeys.length === 0) {
      return state.game === "FANTASY"
        ? Promise.resolve({ ...state, lockKeys: [] })
        : prompt<State>(
            (callback) => (
              <Form
                state={state}
                callback={({ lockKeys }) => callback({ ...state, lockKeys })}
              />
            ),
            <>Magie</>
          );
    }
    return Promise.resolve(state);
  });
}

export function retrieve(currentState: unknown, name: string | undefined) {
  return retrieveFromVersion(version, currentState, stateDecoder, () =>
    pipe(currentState, (s) => LastState.retrieve(s, name), update)
  );
}
