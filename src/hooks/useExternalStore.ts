import { useState, useEffect, useCallback } from 'react';
import { BehaviorSubject } from 'rxjs';
import * as RX from 'rxjs/operators';
import * as IO from 'io-ts';
import { pipe, flow, identity } from 'fp-ts/function';
import * as Either from 'fp-ts/Either';
import * as ArrayFP from 'fp-ts/Array';
import { useNotification } from './../components/Notification';
import { encrypt, decrypt, encode } from './../helpers/crypto';
import * as Reloadable from './../helpers/Reloadable';

const ROOT = 'https://jdr-harrypotter-back.herokuapp.com';
export const stream = new BehaviorSubject<Record<string, Reloadable.Reloadable<Error, unknown[]>>>({});

const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Access-Control-Allow-Origin', '*');

const decodeData = <T extends IO.Mixed, U extends IO.TypeOf<T>>(routeName: string, decoder: T, data: unknown) => pipe(
  data,
  IO.array(IO.string).decode,
  Either.mapLeft(error => error.toString()),
  Either.chain(
    flow(
      ArrayFP.map(decrypt(routeName)),
      (data) => {
        console.log('[YOUPI] fetch', data)
        return data;
      },
      Either.traverseArray(decoder.decode),
      Either.bimap(
        errors => errors.toString(),
        array => array as U[]
      )
    )
  ),
)

const api = (routeName: string) => ({
  readAll: <T extends IO.Mixed, U extends IO.TypeOf<T>>(decoder: T): Promise<U[]> => {
    const requestOptions = {
      method: 'GET',
      headers,
    };
  
    return fetch(`${ROOT}/${routeName}`, requestOptions)
      .then(response => {
        if(!response.ok){
          throw new Error('Unable to join server');
        }
        return response.json();
      })
      .then(data => decodeData(routeName, decoder, data))
      .then(Either.fold(
        (error) => {
          throw error;
        },
        identity,
      ));
  },
  read: (key: string, decoder: IO.Mixed) => {
    const requestOptions = {
      method: 'GET',
      headers,
    };
  
    return fetch(`${ROOT}/${routeName}?key=${key}`, requestOptions)
      .then((response) => response.json())
      .then(data => decodeData(routeName, decoder, data))
      .then(
          Either.filterOrElse(
            result => result.length > 0,
            () => 'Item does not exist'
          )
      )
      .then(response => {
        if(Either.isLeft(response)){
          Either.throwError(response);
        } 
        return response;
      });
  },
  create: (data: {key: string, code: string}) => {
    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    };
  
    return fetch(`${ROOT}/${routeName}`, requestOptions);
  },
  update: ({key, code}: {key: string, code: string}) => {
    const requestOptions = {
      method: 'PUT',
      headers,
      body: JSON.stringify({ code }),
    };
  
    return fetch(`${ROOT}/${routeName}?key=${key}`, requestOptions);
  },
  delete: (key: string) => {
    const requestOptions = {
      method: 'DELETE',
      headers,
    };
  
    return fetch(`${ROOT}/${routeName}?key=${key}`, requestOptions);
  }
});

const streamService = {
  get: <T>(key: string) => key in stream.value ? stream.value[key] as Reloadable.Reloadable<Error, T[]>: Reloadable.initial,
  set: <T>(key: string, value: Reloadable.Reloadable<Error, T[]>) => stream.next({
    ...stream.value,
    [key]: value,
  }),
  has: <T extends string>(key: T) => key in stream.value,
}

export type Props<T extends IO.Mixed> = {
  name: string;
  decoder: T;
  autoFetch?: boolean;
};

export function useExternalStore<T, U extends IO.Mixed>({name, autoFetch = true, decoder}: Props<U>) {
  const [data, setData] = useState<Reloadable.Reloadable<Error, T[]>>(streamService.get(name));
  const { add: addNotification } = useNotification();

  const fetchAll = useCallback(() => {
    const data = streamService.has(name)
    ? pipe(
        streamService.get(name),
        Reloadable.chain(Reloadable.reloading)
      )
    : Reloadable.pending as  Reloadable.Reloadable<Error, T[]>;

    streamService.set(name, data);

    api(name).readAll<U, T>(decoder)
      .then(Reloadable.success)
      .catch(error => Reloadable.failure(new Error(error)))
      .then(result => {
        streamService.set(name, result);
      })
      .catch((e) => {
        addNotification({
          id: `fetchService ${name}`,
          type: 'failure',
          message: `Error in fetching service ${name}`,
        });
        console.error(e)
      })
  }, [name, decoder, addNotification]);

  useEffect(() => {
    // INITIALIZE
    if(!streamService.has(name)){
      streamService.set(name, Reloadable.initial);
      if(autoFetch){
        fetchAll();
      }
    }
  }, [autoFetch, fetchAll, name]);

  useEffect(() => {
    const subscription = stream
      .asObservable()
      .pipe(
        RX.map((data) => data[name] as Reloadable.Reloadable<Error, T[]>),
        RX.distinctUntilChanged(),
      )
      .subscribe({
        next: (value) => setData(value),
      });
    return () => subscription.unsubscribe();
  }, [name]);

  const add = useCallback(<T>(key: string, newValue: T) => {
    api(name).create({key: encode(key), code: encrypt(name)(newValue)})
      .then(fetchAll);
  }, [name, fetchAll]);

  const update = useCallback(<T>(key: string, newValue: T) => {
    api(name).update({key: encode(key), code: encrypt(name)(newValue)})
      .then(fetchAll);
  }, [name, fetchAll]);

  const remove = useCallback((key: string) => {
    api(name).delete(encode(key))
      .then(fetchAll);
  }, [name, fetchAll]);

  return {
    data,
    refetch: fetchAll,
    add,
    update,
    remove,
  } as const;
}