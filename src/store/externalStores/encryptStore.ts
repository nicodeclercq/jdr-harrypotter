import { ExternalStore, CryptedExternalStore } from "./ExternalStore";
import * as IO from "io-ts";
import { pipe, identity } from "fp-ts/function";
import * as Either from "fp-ts/Either";
import {
  encode,
  decode,
  decrypt,
  encrypt,
  decrypt2,
  encrypt2,
} from "../../helpers/crypto";
import { State } from "../State";
import { throws } from "../../helpers/io";

export const encryptStore = (store: ExternalStore): CryptedExternalStore => ({
  getEntries: () =>
    store.getEntries().then((values: string[]) => values.map(decode)),
  create: (name: string) => store.create(encode(name)),
  read: (name: string) => store.read(encode(name)).then(decrypt(name)),
  update: (name: string, state: State) =>
    store.update(encode(name), encrypt(name)(state)).then(decrypt(name)),
  delete: (name: string) => store.delete(encode(name)),
});

type ExternalStore2<T> = {
  getEntries: () => Promise<string[]>;
  create: (name: string) => Promise<void>;
  read: (name: string) => Promise<T>;
  update: (name: string, state: T) => Promise<T>;
  delete: (name: string) => Promise<void>;
};

export const encryptStore2 = <T extends IO.Mixed, U extends IO.TypeOf<T>>(
  decoder: T,
  store: ExternalStore2<string>
): ExternalStore2<U> => ({
  getEntries: () =>
    store.getEntries().then((values: string[]) => values.map(decode)),
  create: (name: string) => store.create(encode(name)),
  read: (name: string) =>
    store
      .read(encode(name))
      .then(decrypt2(name))
      .then(JSON.parse)
      .then(decoder.decode)
      .then(Either.fold(throws, identity)),
  update: (name: string, state: string) =>
    store
      .update(encode(name), pipe(state, JSON.stringify, encrypt2(name)))
      .then(decrypt2(name))
      .then(JSON.parse)
      .then(decoder.decode)
      .then(Either.fold(throws, identity)),
  delete: (name: string) => store.delete(encode(name)),
});
