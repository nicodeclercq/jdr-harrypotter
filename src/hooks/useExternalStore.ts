import { useState, useEffect, useCallback, useMemo } from "react";
import { BehaviorSubject } from "rxjs";
import * as RX from "rxjs/operators";
import * as IO from "io-ts";
import { pipe } from "fp-ts/function";
import { useNotification } from "./../components/Notification";
import * as Reloadable from "./../helpers/Reloadable";
import { getFirebaseStore } from "../store/externalStores/providers/firebase copy";

export const stream = new BehaviorSubject<
  Record<string, Reloadable.Reloadable<Error, unknown[]>>
>({});

const getApi = <T extends IO.Mixed, U extends IO.TypeOf<T>>(
  name: string,
  decoder: T
) => {
  const store = getFirebaseStore(name, decoder);

  const read = store.read;

  const readAll = (): Promise<U[]> =>
    store.getEntries().then((entries) => Promise.all(entries.map(read)));

  const update = ({ key, data }: { key: string; data: U }): Promise<U> =>
    store.update(key, data);

  const create = ({ key, data }: { key: string; data: U }): Promise<U> =>
    store.create(key).then(() => update({ key, data }));

  const deleteFn = (key: string): Promise<void> => store.delete(key);

  return {
    readAll,
    read,
    create,
    update,
    delete: deleteFn,
  };
};

const streamService = {
  get: <T>(key: string) =>
    key in stream.value
      ? (stream.value[key] as Reloadable.Reloadable<Error, T[]>)
      : Reloadable.initial,
  set: <T>(key: string, value: Reloadable.Reloadable<Error, T[]>) =>
    stream.next({
      ...stream.value,
      [key]: value,
    }),
  has: <T extends string>(key: T) => key in stream.value,
};

export type Props<T extends IO.Mixed> = {
  name: string;
  decoder: T;
  autoFetch?: boolean;
};

export function useExternalStore<T, U extends IO.Mixed>({
  name,
  autoFetch = true,
  decoder,
}: Props<U>) {
  const api = useMemo(() => getApi(name, decoder), [name, decoder]);
  const [data, setData] = useState<Reloadable.Reloadable<Error, T[]>>(
    streamService.get(name)
  );
  const { add: addNotification } = useNotification();

  const fetchAll = useCallback(() => {
    const data = streamService.has(name)
      ? pipe(streamService.get(name), Reloadable.chain(Reloadable.reloading))
      : (Reloadable.pending as Reloadable.Reloadable<Error, T[]>);

    streamService.set(name, data);

    api
      .readAll()
      .then(Reloadable.success)
      .catch((error) => {
        console.error(`Error while getting "${name}"`, error);
        return Reloadable.failure(new Error(error));
      })
      .then((result) => {
        streamService.set(name, result);
      })
      .catch((e) => {
        addNotification({
          id: `fetchService ${name}`,
          type: "failure",
          message: `Error in fetching service ${name}`,
        });
        console.error(e);
      });
  }, [name, decoder, addNotification]);

  useEffect(() => {
    // INITIALIZE
    if (!streamService.has(name)) {
      streamService.set(name, Reloadable.initial);
      if (autoFetch) {
        fetchAll();
      }
    }
  }, [autoFetch, fetchAll, name]);

  useEffect(() => {
    const subscription = stream
      .asObservable()
      .pipe(
        RX.map((data) => data[name] as Reloadable.Reloadable<Error, T[]>),
        RX.distinctUntilChanged()
      )
      .subscribe({
        next: (value) => setData(value),
      });
    return () => subscription.unsubscribe();
  }, [name]);

  const add = useCallback(
    <T>(key: string, newValue: T) => {
      api.create({ key: key, data: newValue }).then(fetchAll);
    },
    [name, fetchAll]
  );

  const update = useCallback(
    <T>(key: string, newValue: T) => {
      api
        .update({ key, data: newValue })
        .then(() => {
          console.log("newValue", newValue);
        })
        .then(fetchAll);
    },
    [name, fetchAll]
  );

  const remove = useCallback(
    (key: string) => {
      api.delete(key).then(fetchAll);
    },
    [name, fetchAll]
  );

  return {
    data,
    refetch: fetchAll,
    add,
    update,
    remove,
  } as const;
}
