import { lens } from '../../helpers/object';
import { useStore } from '../../hooks/useStore';
import { State } from '../../store/State';

const lifeLens = lens<State, 'life'>('life');

export const useLife = () => {
  const [life, setLife] = useStore(lifeLens);

  return {
    life,
    setLife,
  }
}