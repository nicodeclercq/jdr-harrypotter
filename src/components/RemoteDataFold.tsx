import React, { useMemo } from "react";
import { pipe } from "fp-ts/function";
import * as RemoteData from "@devexperts/remote-data-ts";

type Props<E, D> = {
  data: RemoteData.RemoteData<E, D>;
  onInitial?: JSX.Element | React.ReactNode;
  onPending?: JSX.Element | React.ReactNode;
  onFailure?: (error: E) => JSX.Element | React.ReactNode;
  onSuccess: (data: D) => JSX.Element | React.ReactNode;
};

export function RemoteDataFold<E, D>({
  data,
  onInitial,
  onPending,
  onFailure,
  onSuccess,
}: Props<E, D>): JSX.Element {
  return useMemo(
    () =>
      pipe(
        data,
        RemoteData.fold(
          () => (onInitial != null ? onInitial : <></>),
          () => (onPending != null ? onPending : <></>),
          (e) => (onFailure != null ? onFailure(e) : <></>),
          onSuccess
        ),
        (a) => a as JSX.Element
      ),
    [data, onInitial, onPending, onFailure, onSuccess]
  );
}
