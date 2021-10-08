import { BehaviorSubject } from 'rxjs';
import * as RX from 'rxjs/operators';
import { useEffect, useCallback } from 'react';
import { Dispatch, SetStateAction, useState } from 'react';

const KEYS = [
  'CONNECTED_USERS',
  'USERS_SKILLS',
] as const;

type Key = (typeof KEYS)[number];


export const stream = new BehaviorSubject<Partial<Record<Key,unknown>>>({});

export function usePersistantState<T>(name: Key): [T, Dispatch<SetStateAction<T>>];
export function usePersistantState<T>(name: Key, initialValue: T): [T, Dispatch<SetStateAction<T>>];
export function usePersistantState<T = undefined>(name: Key, initialValue?: T): [T, Dispatch<SetStateAction<T>>] {
  console.log(stream.value[name] ?? initialValue);
  const [state, setState] = useState(stream.value[name] ?? initialValue);

  const set = useCallback((newValue: T) => {
    stream.next({
      ...stream.value,
      [name]: newValue,
    })
  }, [name]);

  useEffect(() => {
    // INITIALIZE
    if(!(name in stream.value) && initialValue){
      set(initialValue);
    }
  }, [name, initialValue, set]);

  useEffect(() => {
    const subscription = stream
      .asObservable()
      .pipe(
        RX.map((data) => data[name] as T),
        RX.distinctUntilChanged(),
      )
      .subscribe({
        next: (value) => setState(value),
      });
    return () => subscription.unsubscribe();
  }, [name]);

  return [
    state,
    set,
  ] as [T, Dispatch<SetStateAction<T>>] ;
}