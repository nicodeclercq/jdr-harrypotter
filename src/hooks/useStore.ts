import { useEffect, useState } from "react";
import * as RX from 'rxjs/operators';
import { FunctionN, pipe } from "fp-ts/function";
import * as RemoteData from '@devexperts/remote-data-ts';

import { State } from "../store/State";
import { ExternalStore } from "../store/ExternalStore";
import { subject, retrieveState } from "../store/store";
import { equals } from "../helpers/remoteData";

const fetchStatePromise = retrieveState();

export const useStore = <T>([getter, setter]: [getter: FunctionN<[State], T>, setter: (state: State, payload: T) => State]) => {
  const [state, setState] = useState<RemoteData.RemoteData<Error, T>>(pipe(
    subject.value,
    RemoteData.map(getter),
  ));

  useEffect(() => {
    const subscription = subject
    .asObservable()
    .pipe(
      RX.map(RemoteData.map(getter)),
      RX.distinctUntilChanged(equals),
    )
    .subscribe({
      next: (value) => {
        setState(value);
      }
    });

    return () => subscription.unsubscribe();
  },[getter]);

  useEffect(() => {
    if(RemoteData.isInitial(subject.value)){
        Promise.resolve()
        .then(() => subject.next(RemoteData.pending))
        .then(() => fetchStatePromise)
        .then((currentState) => pipe(
          RemoteData.success(currentState),
          (newState: RemoteData.RemoteData<Error, State>) => {
            if(RemoteData.isSuccess(newState)){
              window.localStorage.setItem('state', JSON.stringify(newState.value));
              ExternalStore.update(newState.value.user.name, newState.value)
                .catch((error) => console.error('Unable to save remotely', error));
            }
            subject.next(newState);
          }
        ));
    }
  }, []);

  const resultSetter = (newValue: T) => pipe(
    subject.value,
    RemoteData.map(
      currentState => setter(currentState, newValue)
    ),
    newState => subject.next(newState),
  );

  return [
    state,
    resultSetter,
  ] as const;
};