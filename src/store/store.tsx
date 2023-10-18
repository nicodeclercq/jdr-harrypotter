import { BehaviorSubject } from "rxjs";
import * as RemoteData from "@devexperts/remote-data-ts";
import * as RX from "rxjs/operators";

import { tryCatch } from "../helpers/function";
import { prompt } from "../helpers/io";
import { equals } from "../helpers/remoteData";
import { State, retrieve } from "../store/State";
import { ExternalStoreManager } from "./externalStores/ExternalStoreManager";
import { NameForm } from "../store/v1/NameForm";
import { lastUpdateLens } from "./helper";

export const subject = new BehaviorSubject<RemoteData.RemoteData<Error, State>>(
  RemoteData.initial
);

const onNoLocalState = () =>
  ExternalStoreManager.getEntries()
    .catch((error) => {
      console.error(error);
      return [];
    })
    .then((names: string[]) =>
      prompt<string>(
        (callback: (result: string) => void) => (
          <NameForm defaultValue="" names={names} callback={callback} />
        ),
        <>Qui est ton personnage ?</>
      ).then((name) =>
        (names.includes(name)
          ? ExternalStoreManager.read(name)
          : Promise.resolve(undefined)
        )
          .then((state) => ({ state, name }))
          .catch(() => ({ state: undefined, name }))
      )
    )
    .then(({ state, name }) => retrieve(state, name));

const onLocalState = (state: unknown) =>
  retrieve(state, undefined).then((localState) =>
    ExternalStoreManager.read(localState.user.name)
      .then((state) => retrieve(state, undefined))
      .then((externalState) => {
        const externalLastUpdate = lastUpdateLens.get(externalState);
        const localLastUpdate = lastUpdateLens.get(localState);

        if (localLastUpdate != null && externalLastUpdate != null) {
          return externalLastUpdate > localLastUpdate
            ? externalState
            : localState;
        } else {
          return externalLastUpdate != null ? externalState : localState;
        }
      })
      .catch(() => localState)
  );

export const retrieveState = (): Promise<State> =>
  Promise.resolve(window.localStorage.getItem("state"))
    .then((currentState) =>
      tryCatch(
        () => JSON.parse(currentState || ""),
        () => undefined
      )
    )
    .then((state) => (state != null ? onLocalState(state) : onNoLocalState()));

export const retrieveUserState = (name: string): Promise<State> =>
  ExternalStoreManager.read(name)
    .then((state) => ({ state, name }))
    .catch(() => ({ state: undefined, name }))
    .then(({ state, name }) => retrieve(state, name));

subject
  .asObservable()
  .pipe(RX.distinctUntilChanged(equals), RX.debounceTime(200))
  .subscribe({
    next: (newState) => {
      if (RemoteData.isSuccess(newState)) {
        ExternalStoreManager.update(
          newState.value.user.name,
          newState.value
        ).catch((error) => console.error("Unable to save remotely", error));
        window.localStorage.setItem("state", JSON.stringify(newState.value));
      }
    },
  });
