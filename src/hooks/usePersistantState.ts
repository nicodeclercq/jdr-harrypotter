import { BehaviorSubject } from 'rxjs';
import * as RX from 'rxjs/operators';
import { useEffect, useCallback } from 'react';
import { Dispatch, SetStateAction, useState } from 'react';

const KEYS = [
  'INITIATIVE',
] as const;

type Key = (typeof KEYS)[number];


export const stream = new BehaviorSubject<Partial<Record<Key,unknown>>>({});

export function usePersistantState<T>(name: Key): [T, Dispatch<SetStateAction<T>>];
export function usePersistantState<T>(name: Key, initialValue: T): [T, Dispatch<SetStateAction<T>>];
export function usePersistantState<T = undefined>(name: Key, initialValue?: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(name in stream.value ? stream.value[name] : initialValue);

  const set = useCallback((newValue: T) => {
    console.log('Set', stream.value[name], newValue);
    stream.next({
      ...stream.value,
      [name]: newValue,
    })
  }, [name]);

  useEffect(() => {
    // INITIALIZE
    if(!(name in stream.value) && initialValue){
      stream.next({
        ...stream.value,
        [name]: initialValue,
      })
    }
  }, [name, initialValue]);

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