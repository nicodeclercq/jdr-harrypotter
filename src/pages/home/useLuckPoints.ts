import { lens } from "../../helpers/object";
import { useStore } from "../../hooks/useStore";
import { State } from "../../store/State";

const luckLens = lens<State, "luckPoints">("luckPoints");

export const useLuckPoints = () => {
  const [luckPoints, setLuckPoints] = useStore(luckLens);

  return {
    luckPoints,
    setLuckPoints,
  };
};
