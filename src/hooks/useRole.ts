import { pipe } from "fp-ts/function";
import * as RemoteData from "@devexperts/remote-data-ts";
import { useStore } from "./useStore";
import { stateLens } from "../store/State";

const roleLens = stateLens.fromProperty("role");

export const useRole = () => {
  const [role, setRole] = useStore(roleLens);

  const isMJ = pipe(
    role,
    RemoteData.map((role) => role === "MJ")
  );

  const isPlayer = pipe(
    role,
    RemoteData.map((role) => role === "Player")
  );

  return {
    role,
    isMJ,
    isPlayer,
    setRole,
  };
};
