import { pipe } from 'fp-ts/function';

import { useStore } from '../../hooks/useStore';
import { onSuccess } from '../../helpers/remoteData';
import { State } from '../../store/State';
import { lens } from '../../helpers/object';

const moneyLens = lens<State, 'money'>('money');

export const useMoney = () => {
  const [money, setMoney] = useStore(moneyLens);

  const addMoney = (newMoney: number) => {
    return pipe(
      money,
      onSuccess((money) => setMoney(money + newMoney)),
    );
  }

  return {
    money,
    setMoney,
    addMoney,
  }
}