import { useEffect, useCallback } from 'react';
import * as RemoteData from '@devexperts/remote-data-ts';
import { State } from '../../store/State';
import { retrieveUserState } from '../../store/store';
import { usePersistantRecordState } from '../../hooks/usePersistantRecordState';

export const useUserSkills = (name: string) => {
  const {record: usersSkills, add: addUserSkills} = usePersistantRecordState<RemoteData.RemoteData<Error, State>>('USERS_SKILLS');

  const set = useCallback(
    (newValue: RemoteData.RemoteData<Error, State>) => addUserSkills(name, newValue),
    [addUserSkills, name]
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