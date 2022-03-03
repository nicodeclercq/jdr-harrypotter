import { useCallback } from 'react';
import { usePersistantRecordState } from './usePersistantRecordState';

export type ConnectedUsers = Record<string,string | null | undefined>;

export function useConnectedUsers(){
  const {record: connectedUsers, remove: removeConnectedUser, add: addConnectedUser} = usePersistantRecordState<string | null | undefined>('CONNECTED_USERS');

  const add = useCallback(
    (name: string, imageUrl: string | null | undefined) => {
      addConnectedUser(name, imageUrl);
    },
    [addConnectedUser]
  );

  const remove = useCallback(
    (name: string) => removeConnectedUser(name),
    [removeConnectedUser]
  );

  return {
    connectedUsers,
    add,
    remove,
  } as const;
}