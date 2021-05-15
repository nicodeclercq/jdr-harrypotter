import { useEffect, useState } from "react";
import { BehaviorSubject } from 'rxjs';
import * as RemoteData from '@devexperts/remote-data-ts';

import { tryCatch } from "../helpers/function";
import { State } from "./State";
import { retrieve } from './v4/v4';
import { ExternalStore } from "./ExternalStore";
import { prompt } from "../helpers/io";
import { NameForm } from "./v1/NameForm";

type StateDTO = {
  state: unknown,
  name: string | undefined;
};

const retrieveState = (): Promise<State> => 
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

const subject = new BehaviorSubject<RemoteData.RemoteData<Error, State>>(RemoteData.initial);

export const useStore = () => {
  const [state, setState] = useState<RemoteData.RemoteData<Error, State>>(subject.value);

  const setNewState = (newState: RemoteData.RemoteData<Error, State>) => {
    if(RemoteData.isSuccess(newState)){
      window.localStorage.setItem('state', JSON.stringify(newState.value));
      ExternalStore.update(newState.value.user.name, newState.value)
        .catch((error) => console.error('Unable to save remotely', error));
    }
    subject.next(newState);
  }

  useEffect(() => {
    const subscription = subject.subscribe({next: (value) => {
      setState(value);
    }});

    if(RemoteData.isInitial(subject.value)){
      retrieveState()
        .then((currentState) => setNewState(RemoteData.success(currentState)));
    }

    return () => subscription.unsubscribe();
  },[]);

  return {
    getState: () => state,
    setState: setNewState
  };
}