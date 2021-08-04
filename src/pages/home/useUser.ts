import * as RemoteData from '@devexperts/remote-data-ts';

import { useStore } from '../../store/useStore';
import { pipe } from 'fp-ts/lib/function';
import { useDistinct } from '../../hooks/useDistinct';
import { equals } from '../../helpers/remoteData';


export const useUser = () => {
  const { getState } = useStore();
  const distinct = useDistinct(equals);

  const getName = () => {
    return pipe(
      getState(),
      RemoteData.map(state => state.user.name),
      distinct,
    );
  }

  return {
    getName,
  }
}