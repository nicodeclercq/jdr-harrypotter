import * as RemoteData from '@devexperts/remote-data-ts';

import { useStore } from '../../store/useStore';
import { pipe } from 'fp-ts/lib/function';


export const useUser = () => {
  const { getState } = useStore();

  const getName = () => {
    return pipe(
      getState(),
      RemoteData.map(state => state.user.name),
    );
  }

  return {
    getName,
  }
}