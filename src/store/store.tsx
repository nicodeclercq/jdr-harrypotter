import { BehaviorSubject } from 'rxjs';
import * as RemoteData from '@devexperts/remote-data-ts';

import { tryCatch } from "../helpers/function";
import { prompt } from "../helpers/io";
import { State, retrieve } from "../store/State";
import { ExternalStore } from "../store/ExternalStore";
import { NameForm } from "../store/v1/NameForm";

type StateDTO = {
  state: unknown,
  name: string | undefined;
};

export const subject = new BehaviorSubject<RemoteData.RemoteData<Error, State>>(RemoteData.initial);


export const retrieveState = (): Promise<State> => 
  Promise.resolve(window.localStorage.getItem('state'))
    .then((currentState) => tryCatch(
      () => JSON.parse(currentState || ''),
      () => undefined
    ))
    .then((state): StateDTO | Promise<StateDTO> => {
      return state == null
        ? ExternalStore.getEntries()
          .catch((error) => {
            console.error(error);
            return [];
          })
          .then(
            (names: string[]) => prompt<string>(
              (callback: (result: string) => void) => <NameForm defaultValue="" names={names} callback={callback} />,
              <>Qui est ton personnage ?</>
            ).then(
              (name) =>  (
                names.includes(name)
                    ? ExternalStore.read(name)
                    : Promise.resolve(undefined)
                )
                .then((state) => ({state, name}))
                .catch(() => ({state: undefined, name}))
            )
          )
        : {state, name: undefined};
    })
    .then(({state, name}) => retrieve(state, name));
