import { useEffect, useState } from "react";
import { pipe } from "fp-ts/lib/function";
import { BehaviorSubject } from 'rxjs';
import * as RemoteData from '@devexperts/remote-data-ts';

import { State as CurrentState, retrieve, Trait as CurrentTrait} from './store/v3/v3';
import { tryCatch } from "./helpers/function";

export type State = CurrentState;
export type Trait = CurrentTrait;

const retrieveState = (): Promise<State> => pipe(
  window.localStorage.getItem('state'),
  (currentState) => tryCatch(
    () => JSON.parse(currentState || ''),
    () => undefined
  ),
  retrieve,
);

const subject = new BehaviorSubject<RemoteData.RemoteData<Error, State>>(RemoteData.initial);

export const useStore = () => {
  const [state, setState] = useState<RemoteData.RemoteData<Error, State>>(subject.value);

  const setNewState = (newState: RemoteData.RemoteData<Error, State>) => {
    if(RemoteData.isSuccess(newState)){
      window.localStorage.setItem('state', JSON.stringify(newState.value));
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