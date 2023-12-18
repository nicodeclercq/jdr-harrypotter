import { pipe } from "fp-ts/function";

import { useStore } from "../../hooks/useStore";
import { onSuccess } from "../../helpers/remoteData";
import { stateLens } from "../../store/State";

const moneyLens = stateLens.fromProperty("money");

export const useMoney = () => {
  const [money, setMoney] = useStore(moneyLens);

  const addMoney = (newMoney: number) => {
    return pipe(
      money,
      onSuccess((money) => setMoney(money + newMoney))
    );
  };

  return {
    money,
    setMoney,
    addMoney,
  };
};
