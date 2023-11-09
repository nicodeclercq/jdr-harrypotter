import * as RemoteData from "@devexperts/remote-data-ts";
import { pipe } from "fp-ts/lib/function";

import { useStore } from "../../hooks/useStore";
import { DamageLocation, State } from "../../store/State";
import { lens } from "../../helpers/object";
import { onSuccess } from "../../helpers/remoteData";

const damageLens = lens<State, "damages">("damages");

export const useDamages = () => {
  const [damages, setDamages] = useStore(damageLens);

  const toggleDamage = (d: DamageLocation) => () => {
    pipe(
      damages,
      RemoteData.map((dd: DamageLocation[]) =>
        dd.includes(d) ? dd.filter((d2) => d2 !== d) : [...dd, d]
      ),
      onSuccess(setDamages)
    );
  };

  return {
    damages,
    toggleDamage,
  };
};
