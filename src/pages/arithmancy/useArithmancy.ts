import { TypeofItems } from "./../../helpers/array";
import { TypeofDefined } from "./../../helpers/nullable";
import * as RemoteData from "@devexperts/remote-data-ts";

import { useStore } from "../../hooks/useStore";
import { pipe } from "fp-ts/lib/function";
import { State, stateLens } from "../../store/State";
import { onSuccess } from "../../helpers/remoteData";

type NumberType = TypeofDefined<TypeofItems<State["arithmancy"]["numbers"]>>;

const arithmancyLens = stateLens.fromProperty("arithmancy");

export const useArithmancy = () => {
  const [arithmancy, setArithmancy] = useStore(arithmancyLens);

  const getNumbers = () => {
    return pipe(
      arithmancy,
      RemoteData.map((arithmancy) => arithmancy.numbers)
    );
  };

  const setNumber = (index: number, newNumber: NumberType) => {
    return pipe(
      arithmancy,
      onSuccess((arithmancy) =>
        setArithmancy({
          ...arithmancy,
          numbers: arithmancy.numbers.map((value, i) =>
            index === i ? newNumber : value
          ),
        })
      )
    );
  };

  return {
    getNumbers,
    setNumber,
  };
};
