import { lens } from "../helpers/object";
import { pipe } from "fp-ts/function";
import { onSuccess } from "../helpers/remoteData";
import { State } from "../store/State";
import { useStore } from "./useStore";
import * as RemoteData from "@devexperts/remote-data-ts";

const gameLens = lens<State, "game">("game");

export function useGame() {
  const [game] = useStore(gameLens);

  return {
    game,
    isFantasy: RemoteData.map((game) => game === "FANTASY")(game),
    isHP: RemoteData.map((game) => game === "HP")(game),
  };
}
