import { BehaviorSubject } from 'rxjs';
import * as RX from 'rxjs/operators';
import { useEffect } from 'react';
import { Dispatch, SetStateAction, useState } from 'react';

const KEYS = [
  'AMBIANCE_LINK',
  'AMBIANCE_IMAGES',
  'AMBIANCE_SELECTED_IMAGE',
  'TIMER_TOTAL_TIME',
  'TIMER_TIME',
  'TIMER_PAUSE_TIME',
  'INITIATIVE',
  'RANDOM_PHOTO',
  'RANDOM_PNJ',
] as const;

type Key = (typeof KEYS)[number];


export const stream = new BehaviorSubject<Partial<Record<Key,unknown>>>({});

const set = <T>(name: Key) => (newValue: T) => {
  sessionStorage.setItem(name, JSON.stringify(newValue));
  stream.next({
    ...stream.value,
    [name]: newValue,
  })
};

export function usePersistantState<T>(name: Key): [T, Dispatch<SetStateAction<T>>];
export function usePersistantState<T>(name: Key, initialValue: T): [T, Dispatch<SetStateAction<T>>];
export function usePersistantState<T = undefined>(name: Key, initialValue?: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(name in stream.value ? stream.value[name] : initialValue);

  useEffect(() => {
    // INITIALIZE
    if(!(name in stream.value)){
      const stored = sessionStorage.getItem(name);
      stream.next({
        ...stream.value,
        [name]: stored ? JSON.parse(stored) : initialValue,
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
    set(name),
  ] as [T, Dispatch<SetStateAction<T>>] ;
}