import { useStore } from "../../hooks/useStore";
import { stateLens } from "../../store/State";

const lifeLens = stateLens.fromProperty("life");

export const useLife = () => {
  const [life, setLife] = useStore(lifeLens);

  return {
    life,
    setLife,
  };
};
