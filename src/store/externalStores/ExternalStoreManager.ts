import { PantryStore } from './providers/pantry';
import { State } from '../State';
import { constVoid, pipe } from 'fp-ts/function';
import * as NonEmptyArray from 'fp-ts/NonEmptyArray'
import { CryptedExternalStore } from './ExternalStore';

const stores: NonEmptyArray.NonEmptyArray<CryptedExternalStore> = [
  PantryStore,
];

export const ExternalStoreManager: CryptedExternalStore = {
  getEntries: () => pipe(
    stores,
    NonEmptyArray.head,
    ({getEntries}) => getEntries(),
  ),
  create: (name: string) => Promise.allSettled(stores.map(({create}) => create(name))).then(constVoid),
  read: (name: string) => pipe(
    stores,
    NonEmptyArray.head,
    ({read}) => read(name),
  ),
  update: (name: string, state: State)  => Promise.allSettled(stores.map(({update}) => update(name, state))),
  delete: (name: string)  => Promise.allSettled(stores.map(({delete: del}) => del(name))),
}