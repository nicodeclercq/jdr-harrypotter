import { lens } from '../../helpers/object';
import { useStore } from '../../hooks/useStore';
import { State } from '../../store/State';

const traitsLens = lens<State, 'traits'>('traits');

export const useTraits = () => {
  const [traits] = useStore(traitsLens);

  const getUserTraits = () => traits;

  return {
    getUserTraits,
  }
}