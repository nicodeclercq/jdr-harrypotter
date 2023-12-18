import { stateLens } from "../store/State";
import { useStore } from "./useStore";
import * as RemoteData from "@devexperts/remote-data-ts";
import { GAME } from "../store/v3/v3";

const gameLens = stateLens.fromProperty("game");

export function useGame() {
  const [game, setGame] = useStore(gameLens);

  return {
    game,
    setGame,
    isFantasy: RemoteData.map((game) => game === GAME.FANTASY)(game),
    isHP: RemoteData.map((game) => game === "HP")(game),
  };
}
