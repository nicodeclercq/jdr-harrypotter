import { remove as removeEntry } from './../helpers/object';
import { useCallback } from 'react';
import { usePersistantRecordState } from './usePersistantRecordState';

type Name = string;
type ImageUrl = string | null | undefined;
type ConnectedUsers = Record<Name,ImageUrl>;

export function useConnectedUsers(){
  const {record: connectedUsers, set: setConnectedUsers, add: addConnectedUser} = usePersistantRecordState<ImageUrl>('CONNECTED_USERS');

  const add = useCallback(
    (name: string, imageUrl: ImageUrl) => {
      addConnectedUser(name, imageUrl);
    },
    [addConnectedUser]
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