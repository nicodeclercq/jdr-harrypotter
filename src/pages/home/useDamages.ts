import * as RemoteData from "@devexperts/remote-data-ts";
import { pipe } from "fp-ts/lib/function";

import { useStore } from "../../hooks/useStore";
import { State } from "../../store/State";
import { lens } from "../../helpers/object";
import { onSuccess } from "../../helpers/remoteData";
import {
  DAMAGE_LEVEL,
  DamageLevel,
  DamageLocation,
} from "../../store/v13/damages";

const damageLens = lens<State, "damages">("damages");

const getNextLevelDamaga = (damage: DamageLevel) => {
  const entries = Object.entries(DAMAGE_LEVEL);
  return (entries as [DamageLevel, string][]).reduce((acc, [key], index) => {
    if (key === damage) {
      if (index + 1 >= entries.length) {
        return entries[0][0] as DamageLevel;
      } else {
        return entries[index + 1][0] as DamageLevel;
      }
    }
    return acc;
  }, "healthy");
};

export const useDamages = () => {
  const [damages, setDamages] = useStore(damageLens);

  const toggleDamage = (d: DamageLocation) => () => {
    pipe(
      damages,
      RemoteData.map((dd) => ({
        ...dd,
        [d]: getNextLevelDamaga(dd[d]),
      })),
      onSuccess(setDamages)
    );
  };

  return {
    damages,
    toggleDamage,
  };
};
