import { remove as removeEntry } from "./../helpers/object";
import { useState } from "react";
import { BehaviorSubject } from "rxjs";
import * as RX from "rxjs/operators";
import { useEffect, useCallback } from "react";

const KEYS = ["CONNECTED_USERS", "USERS_SKILLS", "BATTLEMAP_TOKENS"] as const;

type Key = (typeof KEYS)[number];

export const stream = new BehaviorSubject<Partial<Record<Key, unknown>>>({});

export function usePersistantRecordState<T>(name: Key) {
  const [record, setRecord] = useState<Record<string, T>>(
    (name in stream.value ? stream.value[name] : {}) as Record<string, T>
  );

  const set = useCallback(
    (newValue: Record<string, T>) => {
      stream.next({
        ...stream.value,
        [name]: newValue,
      });
    },
    [name]
  );

  const update = useCallback(
    (key: string, newValue: T) => {
      stream.next({
        ...stream.value,
        [name]: {
          ...(stream.value[name] ?? {}),
          [key]: newValue,
        },
      });
    },
    [name]
  );

  const get = useCallback(
    (key: string) => {
      const lastValue = (stream.value[name] ?? {}) as Record<string, T>;
      return lastValue[key];
    },
    [name]
  );

  const add = useCallback(
    (key: string, value: T) => {
      const lastValue = (stream.value[name] ?? {}) as Record<string, T>;

      stream.next({
        ...stream.value,
        [name]: {
          ...lastValue,
          [key]: value,
        },
      });
    },
    [name]
  );

  const remove = useCallback(
    (key: string) => {
      const lastValue = (stream.value[name] ?? {}) as Record<string, T>;
      stream.next({
        ...stream.value,
        [name]: removeEntry(key, lastValue),
      });
    },
    [name]
  );

  useEffect(() => {
    // INITIALIZE
    if (!(name in stream.value)) {
      stream.next({
        ...stream.value,
        [name]: {},
      });
    }
  }, [name]);

  useEffect(() => {
    const subscription = stream
      .asObservable()
      .pipe(
        RX.map((data) => data[name] as Record<string, T>),
        RX.distinctUntilChanged()
      )
      .subscribe({
        next: (value) => setRecord(value),
      });
    return () => subscription.unsubscribe();
  }, [name]);

  return {
    record,
    set,
    update,
    get,
    add,
    remove,
  } as const;
}
