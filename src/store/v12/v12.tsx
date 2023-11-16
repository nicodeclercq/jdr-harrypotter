import { pipe } from "fp-ts/lib/function";
import * as IO from "io-ts";

import { retrieveFromVersion } from "../helper";
import * as LastState from "../v11/v11";
import { decoderFromReadonlyArray } from "../../helpers/io-ts";
import { elements, means, numbers, types } from "./deck";

const version = "V12";

const typesDecoder = decoderFromReadonlyArray(types);
const meansDecoder = decoderFromReadonlyArray(means);
const numbersDecoder = decoderFromReadonlyArray(numbers);
const elementsDecoder = decoderFromReadonlyArray(elements);

export const cardDecoder = IO.type({
  element: elementsDecoder,
  number: numbersDecoder,
  type: typesDecoder,
  mean: meansDecoder,
});

export const stateDecoder = IO.intersection([
  LastState.stateDecoder,
  IO.type({
    cards: IO.type({
      deck: IO.array(cardDecoder),
      table: IO.array(cardDecoder),
      drop: IO.array(cardDecoder),
      hand: IO.array(cardDecoder),
    }),
    luckPoints: IO.number,
  }),
]);

export type State = IO.TypeOf<typeof stateDecoder>;

function update(promise: Promise<LastState.State>): Promise<State> {
  return promise.then((state) => ({
    ...state,
    cards: {
      deck: [],
      table: [],
      drop: [],
      hand: [],
    },
    luckPoints: 0,
  }));
}

export function retrieve(currentState: unknown, name: string | undefined) {
  return retrieveFromVersion(version, currentState, stateDecoder, () =>
    pipe(
      currentState,
      (s) => {
        if (s && typeof s === "object" && (!("game" in s) || !s.game)) {
          return LastState.retrieve({ ...s, game: "HP" }, name);
        }
        return LastState.retrieve(s, name);
      },
      update
    )
  );
}
