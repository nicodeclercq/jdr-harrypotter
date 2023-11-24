import * as IO from "io-ts";

import { useExternalStore } from "./useExternalStore";
import { secrets } from "../secrets";

const decoder = IO.type({
  character: IO.array(IO.string),
  description: IO.union([IO.string, IO.undefined, IO.null]),
  gender: IO.union([IO.literal("Homme"), IO.literal("Femme")]),
  age: IO.number,
  color: IO.type({
    name: IO.string,
    color: IO.string,
  }),
  name: IO.string,
  magics: IO.string,
});

type PNJ = IO.TypeOf<typeof decoder>;

export function usePNJ() {
  const result = useExternalStore<PNJ, typeof decoder>({
    name: secrets.firebaseCollectionId2,
    decoder,
  });

  return result;
}
