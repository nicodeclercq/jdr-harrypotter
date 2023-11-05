import { lens } from "../helpers/object";
import { State } from "../store/State";
import { useStore } from "./useStore";
import * as RemoteData from "@devexperts/remote-data-ts";
import { GAME } from "../store/v3/v3";

const gameLens = lens<State, "game">("game");

export function useGame() {
  const [game] = useStore(gameLens);

  return {
    game,
    isFantasy: RemoteData.map((game) => game === GAME.FANTASY)(game),
    isHP: RemoteData.map((game) => game === "HP")(game),
  };
}
