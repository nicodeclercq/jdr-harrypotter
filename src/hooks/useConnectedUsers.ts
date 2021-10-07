import { remove as removeEntry } from './../helpers/object';
import { useState, useEffect, useCallback } from 'react';
import { BehaviorSubject } from 'rxjs';

export const connectedUsersSubject = new BehaviorSubject<Record<string,string | null | undefined>>({});

export function useConnectedUsers(){
  const [connectedUsers, setConnectedUsers] = useState(connectedUsersSubject.value);

  useEffect(() => {
    const subscription = connectedUsersSubject
      .subscribe({
        next: setConnectedUsers
      });
    return () => {
      subscription.unsubscribe();
    }
  }, []);

  const add = useCallback(
    (name: string, imageUrl: string | null | undefined) => {
      connectedUsersSubject.next({...connectedUsersSubject.value, [name]: imageUrl})
    },
    []
  );

  const remove = useCallback(
    (name: string) => connectedUsersSubject.next(removeEntry(name, connectedUsersSubject.value)),
    []
  );

  return {
    connectedUsers,
    add,
    remove,
  } as const;
}