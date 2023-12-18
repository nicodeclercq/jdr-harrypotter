import * as RemoteData from "@devexperts/remote-data-ts";
import { pipe } from "fp-ts/function";

import { RUNES } from "./../../components/Runes";
import { useStore } from "../../hooks/useStore";
import { RuneName } from "../../components/Runes";
import { stateLens } from "../../store/State";
import { onSuccess } from "../../helpers/remoteData";
import { keys } from "../../helpers/object";

const runesDefinitionLens = stateLens.fromProperty("runesDefinition");
const knownRunesLens = stateLens.fromProperty("knownRunes");

export const useRune = () => {
  const [runesDefinition, setRunesDefinition] = useStore(runesDefinitionLens);
  const [knownRunes, setKnownRunes] = useStore(knownRunesLens);

  const setSignification = (name: RuneName, signification: string) => {
    pipe(
      runesDefinition,
      RemoteData.map((runesDefinition) => ({
        ...runesDefinition,
        [name]: signification,
      })),
      onSuccess(setRunesDefinition)
    );
  };

  const learnAllRunes = () => {
    setKnownRunes(keys(RUNES));
  };
  const setAllRunesDefinition = () => {
    setRunesDefinition(RUNES);
  };

  return {
    runesDefinition,
    knownRunes,
    setSignification,
    setKnownRunes,
    learnAllRunes,
    setAllRunesDefinition,
  };
};
