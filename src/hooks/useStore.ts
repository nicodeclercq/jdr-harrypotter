import { useEffect, useState } from "react";
import * as RX from "rxjs/operators";
import { constant, FunctionN, pipe, flow } from "fp-ts/function";
import * as RemoteData from "@devexperts/remote-data-ts";

import { State } from "../store/State";
import { subject, retrieveState } from "../store/store";
import { equals } from "../helpers/remoteData";
import { lastUpdateLens } from "../store/helper";

const fetchStatePromise = retrieveState();

type Props<T> = {
  get: FunctionN<[State], T>;
  set: (state: State, payload: T) => State;
};

export const useStore = <T>(lens: Props<T>) => {
  const [state, setState] = useState<RemoteData.RemoteData<Error, T>>(
    pipe(subject.value, RemoteData.map(lens.get))
  );

  useEffect(() => {
    const subscription = subject
      .asObservable()
      .pipe(
        RX.distinctUntilChanged(equals),
        RX.map(RemoteData.map(lens.get)),
        RX.distinctUntilChanged(equals)
      )
      .subscribe({
        next: (value) => {
          setState(value);
        },
      });

    return () => subscription.unsubscribe();
  }, [lens.get]);

  useEffect(() => {
    if (RemoteData.isInitial(subject.value)) {
      subject.next(RemoteData.pending);

      fetchStatePromise.then((currentState) =>
        pipe(RemoteData.success(currentState), (newState) => {
          subject.next(newState);
        })
      );
    }
  }, []);

  const resultSetter = (newValue: T) =>
    pipe(
      subject.value,
      RemoteData.map(
        flow(
          (currentState) => lens.set(currentState, newValue),
          lastUpdateLens.set(new Date())
        )
      ),
      (newState) => subject.next(newState)
    );

  return [state, resultSetter] as const;
};

type LoadState = "initial" | "pending" | "failure" | "success";
const foldLoadState: (r: RemoteData.RemoteData<unknown, unknown>) => LoadState =
  RemoteData.fold(
    constant("initial"),
    constant("pending"),
    constant("failure"),
    constant("success")
  );

export const useStoreLoadState = () => {
  const [loadState, setState] = useState<LoadState>(
    pipe(subject.value, foldLoadState)
  );

  useEffect(() => {
    const subscription = subject
      .asObservable()
      .pipe(RX.distinctUntilChanged())
      .subscribe({
        next: (value) => {
          setState(foldLoadState(value));
        },
      });

    return () => subscription.unsubscribe();
  }, []);

  return {
    loadState,
  } as const;
};
