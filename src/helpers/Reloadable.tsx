import { FunctionN, identity, pipe } from "fp-ts/function";
import * as RemoteData from "@devexperts/remote-data-ts";
import { Load } from "../components/Load";

export const initial = RemoteData.initial;
export const pending = RemoteData.pending;
export const failure = RemoteData.failure;
export const success = RemoteData.success;

const TAG = "ReloadableReloading" as const;

type Reloading<T> = {
  _tag: typeof TAG;
  value: T;
};

export type Reloadable<E, T> = Reloading<T> | RemoteData.RemoteData<E, T>;

export const reloading = <T,>(value: T) =>
  ({
    _tag: TAG,
    value,
  } as const);

export const isReloading = <E, T>(
  data: Reloadable<E, T>
): data is Reloading<T> => "_tag" in data && data._tag === TAG;

export const map =
  <E, A, B>(fn: FunctionN<[A], B>) =>
    (reloadable: Reloadable<E, A>): Reloadable<E, B> => {
      if (isReloading(reloadable)) {
        return pipe(reloadable.value, fn, reloading) as Reloadable<E, B>;
      }
      return pipe(reloadable, RemoteData.map(fn)) as Reloadable<E, B>;
    };

export const chain =
  <E, A, B>(fn: FunctionN<[A], Reloadable<E, B>>) =>
    (reloadable: Reloadable<E, A>): Reloadable<E, B> => {
      if (isReloading(reloadable)) {
        return pipe(reloadable.value, fn) as Reloadable<E, B>;
      }
      return pipe(
        reloadable,
        RemoteData.map(fn),
        RemoteData.fold(
          () => RemoteData.initial,
          () => RemoteData.pending,
          RemoteData.failure,
          identity
        )
      ) as Reloadable<E, B>;
    };

export const fold =
  <E, A, B>(
    onInitial: FunctionN<[], B>,
    onLoading: FunctionN<[], B>,
    onFailure: FunctionN<[E], B>,
    onSuccess: FunctionN<[A], B>,
    onReloading: FunctionN<[A], B>
  ) =>
    (reloadable: Reloadable<E, A>): B => {
      return isReloading(reloadable)
        ? onReloading(reloadable.value)
        : RemoteData.fold(onInitial, onLoading, onFailure, onSuccess)(reloadable);
    };

export const fromReloadable =
  <T, U>(
    callback: (data: U, isReloading: boolean) => JSX.Element,
    onError: (error: T) => JSX.Element,
    onInitial: () => JSX.Element = Load
  ) =>
    (reloadableData: Reloadable<T, U>): JSX.Element =>
      pipe(
        reloadableData,
        fold(
          onInitial,
          Load,
          onError,
          (data) => callback(data, false),
          (data) => callback(data, true)
        )
      );
