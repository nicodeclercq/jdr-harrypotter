import { useEffect, useState } from "react";
import * as RX from 'rxjs/operators';
import { constant, FunctionN, pipe } from "fp-ts/function";
import * as RemoteData from '@devexperts/remote-data-ts';

import { State } from "../store/State";
import { subject, retrieveState } from "../store/store";
import { equals } from "../helpers/remoteData";

const fetchStatePromise = retrieveState();

type Props<T> = [
  getter: FunctionN<[State], T>,
  setter: (state: State, payload: T) => State
];

export const useStore = <T>([getter, setter]: Props<T>) => {
  const [state, setState] = useState<RemoteData.RemoteData<Error, T>>(pipe(
    subject.value,
    RemoteData.map(getter),
  ));

  useEffect(() => {
    const subscription = subject
    .asObservable()
    .pipe(
      RX.distinctUntilChanged(equals),
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
      subject.next(RemoteData.pending);

      fetchStatePromise
        .then((currentState) => pipe(
          RemoteData.success(currentState),
          newState => {
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

type LoadState = 'initial' | 'pending' | 'failure' | 'success';
const foldLoadState: (r: RemoteData.RemoteData<unknown, unknown>) => LoadState = RemoteData.fold(
  constant('initial'),
  constant('pending'),
  constant('failure'),
  constant('success'),
);

export const useStoreLoadState = () => {
  const [loadState, setState] = useState<LoadState>(pipe(
    subject.value,
    foldLoadState,
  ));

  useEffect(() => {
    const subscription = subject
    .asObservable()
    .pipe(
      RX.distinctUntilChanged(),
    )
    .subscribe({
      next: (value) => {
        setState(foldLoadState(value));
      }
    });

    return () => subscription.unsubscribe();
  },[]);

  return {
    loadState,
   } as const;
};