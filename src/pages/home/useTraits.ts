import * as RemoteData from '@devexperts/remote-data-ts';

import { useStore } from '../../store/useStore';
import { pipe } from 'fp-ts/lib/function';
import { equals } from '../../helpers/remoteData';
import { useDistinct } from '../../hooks/useDistinct';


export const useTraits = () => {
  const { getState } = useStore();
  const distinct = useDistinct(equals);

  const getUserTraits = () => {
    return pipe(
      getState(),
      RemoteData.map(state => state.traits),
      distinct,
    );
  }

  return {
    getUserTraits,
  }
}