import { useEffect, useCallback } from 'react';
import * as RemoteData from '@devexperts/remote-data-ts';
import { usePersistantState } from '../../hooks/usePersistantState';
import { State } from '../../store/State';
import { retrieveUserState } from '../../store/store';

export const useUserSkills = (name: string) => {
  const [usersSkills, setUsersSkills] = usePersistantState<Record<string, RemoteData.RemoteData<Error, State>>>('USERS_SKILLS', {});

  const set = useCallback(
    (newValue: RemoteData.RemoteData<Error, State>) => setUsersSkills({
      ...usersSkills,
      [name]: newValue,
    }),
    [name, setUsersSkills, usersSkills]
  );

  useEffect(() => {
    if(!(name in usersSkills)){
      set(RemoteData.pending);
      retrieveUserState(name)
        .then((state) => set(RemoteData.success(state)))
        .catch(error => set(RemoteData.failure(error)));
    }
  }, [name, set, usersSkills]);

  return [
    usersSkills[name] ?? RemoteData.initial,
    set,
  ] as [RemoteData.RemoteData<Error, State>, (newValue: RemoteData.RemoteData<Error, State>) => void];
}