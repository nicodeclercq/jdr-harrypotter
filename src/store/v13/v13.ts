import { pipe } from "fp-ts/lib/function";
import * as IO from "io-ts";

import { retrieveFromVersion } from "../helper";
import * as LastState from "../v12/v12";

const version = "V13";

const damageLocationDecoder = IO.union([
  IO.literal("head"),
  IO.literal("neck"),
  IO.literal("shoulder left"),
  IO.literal("shoulder right"),
  IO.literal("torax"),
  IO.literal("arm left"),
  IO.literal("arm right"),
  IO.literal("belly"),
  IO.literal("pelvis"),
  IO.literal("hand left"),
  IO.literal("hand right"),
  IO.literal("thigh left"),
  IO.literal("thigh right"),
  IO.literal("knee left"),
  IO.literal("knee right"),
  IO.literal("calf left"),
  IO.literal("calf right"),
  IO.literal("foot left"),
  IO.literal("foot right"),
]);

export const stateDecoder = IO.intersection([
  LastState.stateDecoder,
  IO.type({
    damages: IO.array(damageLocationDecoder),
  }),
]);

export type State = IO.TypeOf<typeof stateDecoder>;

function update(promise: Promise<LastState.State>): Promise<State> {
  return promise.then((state) => ({
    ...state,
    damages: [],
  }));
}

export function retrieve(currentState: unknown, name: string | undefined) {
  return retrieveFromVersion(version, currentState, stateDecoder, () =>
    pipe(currentState, (s) => LastState.retrieve(s, name), update)
  );
}
