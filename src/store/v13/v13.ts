import { pipe } from "fp-ts/lib/function";
import * as IO from "io-ts";
import * as Record from "fp-ts/Record";

import { retrieveFromVersion } from "../helper";
import { UnionToTuple, decoderFromReadonlyArray } from "../../helpers/io-ts";
import * as LastState from "../v12/v12";
import { emptyRecord } from "../../helpers/object";
import { DAMAGE_LEVEL, DAMAGE_LOCATION } from "./damages";

const version = "V13";

const damageLevelDecoder = decoderFromReadonlyArray(
  Record.keys(DAMAGE_LEVEL) as UnionToTuple<keyof typeof DAMAGE_LEVEL>
);

type DamageLevel = IO.TypeOf<typeof damageLevelDecoder>;

const damageLocationDecoder = decoderFromReadonlyArray(
  Record.keys(DAMAGE_LOCATION) as UnionToTuple<keyof typeof DAMAGE_LOCATION>
);

type DamageLocation = IO.TypeOf<typeof damageLocationDecoder>;

export const stateDecoder = IO.intersection([
  LastState.stateDecoder,
  IO.type({
    damages: IO.record(damageLocationDecoder, damageLevelDecoder),
  }),
]);

export type State = IO.TypeOf<typeof stateDecoder>;

function update(promise: Promise<LastState.State>): Promise<State> {
  return promise.then((state) => ({
    ...state,
    damages: Record.keys(DAMAGE_LOCATION).reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: "healthy",
      }),
      emptyRecord<DamageLocation, DamageLevel>()
    ),
  }));
}

export function retrieve(currentState: unknown, name: string | undefined) {
  return retrieveFromVersion(version, currentState, stateDecoder, () =>
    pipe(currentState, (s) => LastState.retrieve(s, name), update)
  );
}
