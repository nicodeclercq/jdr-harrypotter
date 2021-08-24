import * as RemoteData from '@devexperts/remote-data-ts';
import { pipe } from 'fp-ts/function';

import { useStore } from '../../hooks/useStore';
import { RuneName } from '../../components/Runes';
import { State } from '../../store/State';
import { onSuccess } from '../../helpers/remoteData';
import { lens } from '../../helpers/object';

const runesDefinitionLens = lens<State, 'runesDefinition'>('runesDefinition');
const knownRunesLens = lens<State, 'knownRunes'>('knownRunes');

export const useRune = () => {
  const [runesDefinition, setRunesDefinition] = useStore(runesDefinitionLens);
  const [knownRunes, setKnownRunes] = useStore(knownRunesLens);

  const setSignification = (name: RuneName, signification: string) => {
    pipe(
      runesDefinition,
      RemoteData.map(
        runesDefinition => ({
          ...runesDefinition,
          [name]: signification
        })
      ),
      onSuccess(setRunesDefinition),
    );
  };

  const getRunesSignification = () => runesDefinition;
  const getKnownRunes = () => knownRunes;

  return {
    setSignification,
    getRunesSignification,
    getKnownRunes,
    setKnownRunes,
  }
}