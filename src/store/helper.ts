import { pipe } from "fp-ts/function";
import * as Either from 'fp-ts/Either';
import { Decoder } from "io-ts";
import { formatValidationErrors } from 'io-ts-reporters';
import { State } from './State';

export function retrieveFromVersion<U>(
  version: string,
  currentState: unknown,
  decoder: Decoder<unknown, U>,
  lowerVersionRetrieve: () => Promise<U>
): Promise<U> {
  return pipe(
    currentState,
    decoder.decode,
    Either.fold(
      (error) => {
        console.group(`[${version}] given state is not convertible to current version`);
        console.warn(formatValidationErrors(error).join('\n\n'));
        console.log('Fallback to lower version');
        console.groupEnd();

        return lowerVersionRetrieve()
      },
      (state) => Promise.resolve(state),
    )
  );
}

export const lastUpdateLens = {
  get: (state: State) => state.lastUpdate ? new Date(Number.parseInt(state.lastUpdate)) : undefined,
  set: (newDate: Date) => (state: State): State => ({...state, lastUpdate: `${newDate.getTime()}`}),
}
