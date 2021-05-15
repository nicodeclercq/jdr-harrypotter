import * as RemoteData from '@devexperts/remote-data-ts';

import { useStore } from '../../store/useStore';
import { pipe } from 'fp-ts/lib/function';


export const useTraits = () => {
  const { getState } = useStore();

  const getUserTraits = () => {
    return pipe(
      getState(),
      RemoteData.map(state => state.traits),
    );
  }

  return {
    getUserTraits,
  }
}