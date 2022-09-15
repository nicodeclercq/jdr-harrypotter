import { State } from "../State";

export type CryptedExternalStore = {
  getEntries: () => Promise<string[]>;
  create: (name: string) => Promise<void>,
  read: (name: string) => Promise<any>,
  update: (name: string, state: State) => Promise<any>,
  delete: (name: string) => Promise<any>
}

export type ExternalStore = Omit<CryptedExternalStore, 'update'> & { update: (name: string, state: string) => Promise<any>};