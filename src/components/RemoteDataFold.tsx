import React, { useMemo } from 'react';
import { pipe } from 'fp-ts/function';
import * as RemoteData from '@devexperts/remote-data-ts';

type Props<E, D> = {
  data: RemoteData.RemoteData<E, D>;
  onInitial?: JSX.Element;
  onPending?: JSX.Element;
  onFailure?: (error: E) => JSX.Element;
  onSuccess: (data: D) => JSX.Element;
};

export function RemoteDataFold<E, D>({data, onInitial, onPending, onFailure, onSuccess}: Props<E, D>): JSX.Element {
  return useMemo(
    () => pipe(
      data,
      RemoteData.fold(
        () => onInitial != null ? onInitial : <></>,
        () => onPending != null ? onPending : <></>,
        (e) => onFailure != null ? onFailure(e) : <></>,
        onSuccess,
      ),
    ),
    [data, onInitial, onPending, onFailure, onSuccess]
  );
}