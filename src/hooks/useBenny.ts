import * as RemoteData from "@devexperts/remote-data-ts";
import { pipe } from "fp-ts/function";
import { lens } from "./../helpers/object";
import { useSocket } from "./useSocket";
import { onSuccess } from "../helpers/remoteData";
import { State } from "./../store/State";
import { useSound } from "./useSound";
import { useStore } from "./useStore";
import { useLockKey } from "./useLockKey";
import { sequence } from "../helpers/remoteData";
import { LOCK } from "../lock";

const benniesLens = lens<State, "bennies">("bennies");

export function useBenny() {
  const { lockKeys } = useLockKey();
  const { play } = useSound();
  const { emit } = useSocket();
  const [bennies, setBennies] = useStore(benniesLens);

  const addBenny = () =>
    pipe(
      bennies,
      onSuccess((b) => {
        play("success");
        setBennies([...b, { x: 50, y: 50 }]);
      })
    );

  const moveBenny = (newPosition: { x: number; y: number }, index: number) =>
    pipe(
      bennies,
      onSuccess((bs) =>
        setBennies(bs.map((b, i) => (i === index ? newPosition : b)))
      )
    );

  const removeBenny = (index: number) =>
    pipe(
      bennies,
      onSuccess((b) => {
        play("success");
        emit({ type: "useBenny" });
        setBennies(b.filter((_b, i) => i !== index));
      })
    );

  return {
    bennies: pipe(
      sequence({ bennies, lockKeys }),
      RemoteData.map(({ bennies, lockKeys }) =>
        lockKeys.includes(LOCK.BENNIES) ? bennies : []
      )
    ),
    addBenny,
    moveBenny,
    removeBenny,
  };
}
