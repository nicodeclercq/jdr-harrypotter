import { lens } from '../../helpers/object';
import { useStore } from '../../hooks/useStore';
import { State } from '../../store/State';

const objectsLens = lens<State, 'objects'>('objects');

export const useObjects = () => {
  const [objects, setObjects] = useStore(objectsLens);

  return {
    objects,
    setObjects,
  }
}