import { useStore } from "../../hooks/useStore";
import { stateLens } from "../../store/State";

const traitsLens = stateLens.fromProperty("traits");

export const useTraits = () => {
  const [traits] = useStore(traitsLens);

  return {
    traits,
  };
};
