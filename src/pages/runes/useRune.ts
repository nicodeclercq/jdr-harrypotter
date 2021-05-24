import * as RemoteData from '@devexperts/remote-data-ts';
import { pipe } from 'fp-ts/function';

import { useStore } from '../../store/useStore';
import { RuneName } from '../../components/Runes';

export const useRune = () => {
  const { getState, setState } = useStore();

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
    )
  );

  const getKnownRunes = () => pipe(
    getState(),
    RemoteData.map(
      state => state.knownRunes
    )
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