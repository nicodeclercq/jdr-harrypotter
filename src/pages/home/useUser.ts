import * as RemoteData from '@devexperts/remote-data-ts';
import { pipe } from 'fp-ts/lib/function';

import { useStore } from '../../hooks/useStore';
import { State } from '../../store/State';
import { lens } from '../../helpers/object';

const userLens = lens<State, 'user'>('user');

export const useUser = () => {
  const [user] = useStore(userLens);

  const name = pipe(
    user,
    RemoteData.map(user => user.name),
  );

  return {
    name,
  }
}