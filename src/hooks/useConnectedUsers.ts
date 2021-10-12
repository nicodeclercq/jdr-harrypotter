import { remove as removeEntry } from './../helpers/object';
import { useCallback } from 'react';
import { usePersistantState } from './usePersistantState';

export type ConnectedUsers = Record<string,string | null | undefined>;

export function useConnectedUsers(){
  const [connectedUsers, setConnectedUsers] = usePersistantState<ConnectedUsers>('CONNECTED_USERS', {});

  const add = useCallback(
    (name: string, imageUrl: string | null | undefined) => {
      setConnectedUsers({...connectedUsers, [name]: imageUrl})
    },
    [connectedUsers, setConnectedUsers]
  );

  const remove = useCallback(
    (name: string) => setConnectedUsers(removeEntry(name, connectedUsers)),
    [connectedUsers, setConnectedUsers]
  );

  return {
    connectedUsers,
    add,
    remove,
  } as const;
}