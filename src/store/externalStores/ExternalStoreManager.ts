import { FirebaseStore } from './providers/firebase';
import { PantryStore } from './providers/pantry';
import { State } from '../State';
import { constVoid } from 'fp-ts/function';
import { NonEmptyArray } from 'fp-ts/NonEmptyArray'
import { CryptedExternalStore } from './ExternalStore';

const stores: NonEmptyArray<CryptedExternalStore> = [
  PantryStore,
  FirebaseStore,
];

export const ExternalStoreManager: CryptedExternalStore = {
  getEntries: () => Promise.allSettled(
      stores.map(({getEntries}) => getEntries())
    )
    .then(results => 
      results.reduce(
        (acc, result) => acc.length === 0 && result.status === 'fulfilled'
          ? result.value
          : acc,
        [] as string[]
      )
    ),
  create: (name: string) => Promise.allSettled(stores.map(({create}) => create(name))).then(constVoid),
  read: (name: string) => Promise.allSettled(
      stores.map(({read}) => read(name))
    )
    .then(results => 
      results.reduce(
        (acc, result) => acc === '' && result.status === 'fulfilled'
          ? result.value
          : acc,
        ''
      )
    ),
  update: (name: string, state: State)  => Promise.allSettled(
      stores.map(({update}) => update(name, state))
    )
    .then(results => 
      results.reduce(
        (acc, result) => acc === '' && result.status === 'fulfilled'
          ? result.value
          : acc,
        ''
      )
    ),
  delete: (name: string)  => Promise.allSettled(stores.map(({delete: del}) => del(name)))
    .then(constVoid),
}