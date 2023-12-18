import { useStore } from "../../hooks/useStore";
import { stateLens } from "../../store/State";

const luckLens = stateLens.fromProperty("luckPoints");

export const useLuckPoints = () => {
  const [luckPoints, setLuckPoints] = useStore(luckLens);

  return {
    luckPoints,
    setLuckPoints,
  };
};
