 
import { pipe } from "fp-ts/function";
import * as RemoteData from "@devexperts/remote-data-ts";
import { useStore } from "./useStore";
import { State } from "../store/State";
import { lens } from "../helpers/object";

const roleLens = lens<State, "role">("role");

export const useRole = () => {
  const [role, setRole] = useStore(roleLens);

  const isMJ = pipe(
    role,
    RemoteData.map(
      role => role === "MJ"
    ),
  );

  const isPlayer = pipe(
    role,
    RemoteData.map(
      role => role === "Player"
    ),
  );

  return {
    role,
    isMJ,
    isPlayer,
    setRole,
  };
};