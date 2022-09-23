import { State } from "../State";

export type CryptedExternalStore = {
  getEntries: () => Promise<string[]>;
  create: (name: string) => Promise<void>,
  read: (name: string) => Promise<string>,
  update: (name: string, state: State) => Promise<string>,
  delete: (name: string) => Promise<void>
}

export type ExternalStore = Omit<CryptedExternalStore, 'update'> & { update: (name: string, state: string) => Promise<any>};