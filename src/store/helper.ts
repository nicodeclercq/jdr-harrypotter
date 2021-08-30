import { pipe } from "fp-ts/function";
import * as Either from 'fp-ts/Either';
import { Decoder } from "io-ts";
import { formatValidationErrors } from 'io-ts-reporters';
import { AES, SHA256, enc } from 'crypto-js';
import { secrets } from "../secrets";

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

export const encode = (str: string) => btoa(unescape(encodeURIComponent(str)));
export const decode = (str: string) => decodeURIComponent(escape(window.atob(str)));

const getLockKey = (str: string) => SHA256(`${str}${secrets.salt}`).toString(); 

export const encrypt = (key: string) => (json: unknown) => {
  const str = JSON.stringify(json);
  const lockKey = getLockKey(key);
  return AES.encrypt(str, lockKey).toString();
}

export const decrypt = (key: string) => (value: string )  => {
  const lockKey = getLockKey(key);
  const result = AES.decrypt(value, lockKey).toString(enc.Utf8)/*?*/;
  return JSON.parse(result/*?*/);
}