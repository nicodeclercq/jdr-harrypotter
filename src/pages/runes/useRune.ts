import * as RemoteData from '@devexperts/remote-data-ts';
import { pipe } from 'fp-ts/function';

import { useStore } from '../../store/useStore';
import { RuneName } from '../../components/Runes';
import { useDistinct } from '../../hooks/useDistinct';
import { equals } from '../../helpers/remoteData';

export const useRune = () => {
  const { getState, setState } = useStore();
  const distinct = useDistinct(equals);

  const setSignification = (name: RuneName, signification: string) => {
    pipe(
      getState(),
      RemoteData.map(
        state => ({
          ...state,
          runesDefinition: {
            ...state.runesDefinition,
            [name]: signification
          },
        })
      ),
      setState,
    );
  };

  const getRunesSignification = () => pipe(
    getState(),
    RemoteData.map(
      state => state.runesDefinition
    ),
    distinct,
  );

  const getKnownRunes = () => pipe(
    getState(),
    RemoteData.map(
      state => state.knownRunes
    ),
    distinct,
  )

  const setKnownRunes = (knownRunes: string[]) => pipe(
    getState(),
    RemoteData.map(
      state => ({
        ...state,
        knownRunes,
      })
    ),
    setState,
  )

  return {
    setSignification,
    getRunesSignification,
    getKnownRunes,
    setKnownRunes,
  }
}