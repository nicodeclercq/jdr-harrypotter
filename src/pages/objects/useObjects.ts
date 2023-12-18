import { useStore } from "../../hooks/useStore";
import { stateLens } from "../../store/State";

const objectsLens = stateLens.fromProperty("objects");

export const useObjects = () => {
  const [objects, setObjects] = useStore(objectsLens);

  return {
    objects,
    setObjects,
  };
};
