import { createArray } from './../../helpers/array';
import { pipe } from 'fp-ts/lib/function';
import * as IO from 'io-ts';

import { retrieveFromVersion } from '../helper';
import * as V6 from '../v6/v6';

export type Trait = V6.Trait;
export type UserSpell = V6.UserSpell;
export type Skills = V6.Skills;

const version = 'V7';

const arithmancyNumberDecoder = IO.union([
  IO.type({
    type: IO.literal('name'),
    value: IO.string,
  }),
  IO.type({
    type: IO.literal('verb'),
    value: IO.string,
    invert: IO.string,
  }),
  IO.type({
    type: IO.literal('inverse'),
  }),
  IO.undefined,
  IO.null,
])

const arithmancyDecoder = IO.type({
  numbers: IO.array(arithmancyNumberDecoder),
});

const carthomancyDecoder = IO.type({
  used: IO.array(IO.number),
  visible: IO.array(IO.union([IO.number, IO.undefined, IO.null])),
  cardsNumber: IO.number,
});
const stateDecoder = IO.intersection([
  V6.stateDecoder,
  IO.type({
    carthomancy: carthomancyDecoder,
    arithmancy: arithmancyDecoder,
  })
]);

export type State = IO.TypeOf<typeof stateDecoder>;

function update(promise: Promise<V6.State>): Promise<State> {
  return promise
    .then((state) => ({
      ...state,
      carthomancy: {
        used: [],
        visible: [
          undefined,
          undefined,
          undefined
        ],
        cardsNumber: 3,
      },
      arithmancy: {
        numbers: createArray(9).map(() => undefined),
      },
    }));
}

export function retrieve(currentState: unknown, name: string | undefined) {
  return retrieveFromVersion(
    version,
    currentState,
    stateDecoder,
    () => pipe(
      currentState,
      s => V6.retrieve(s, name),
      update,
    )
  );
}