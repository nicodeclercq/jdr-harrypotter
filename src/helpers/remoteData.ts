import * as RemoteData from "@devexperts/remote-data-ts";
import { sequenceS } from 'fp-ts/Apply';
import { pipe, constVoid } from "fp-ts/function";
import { Load } from "../components/Load";

export const sequence = sequenceS(RemoteData.remoteData);

export const fromRemoteData = <T, U>(callback: (data: U) => JSX.Element, onInitial:() => JSX.Element = Load) => (remoteData: RemoteData.RemoteData<T, U>): JSX.Element => pipe(
  remoteData,
  RemoteData.fold(
    onInitial,
    Load,
    Load,
    callback,
  )
);

export const onSuccess = <T, U>(callback: (data: U) => void ) => (remoteData: RemoteData.RemoteData<T, U>): void => pipe(
  remoteData,
  RemoteData.fold(
    constVoid,
    constVoid,
    constVoid,
    callback,
  )
);

export const equals = <T, U>(a: RemoteData.RemoteData<T, U>, b: RemoteData.RemoteData<T, U>) => pipe(
  a,
  RemoteData.fold(
    () => RemoteData.isInitial(b),
    () => RemoteData.isPending(b),
    e => RemoteData.isFailure(b) && b.error === e,
    v => RemoteData.isSuccess(b) && b.value === v,
  ),
);