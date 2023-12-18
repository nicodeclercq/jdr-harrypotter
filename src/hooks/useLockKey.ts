import { pipe } from "fp-ts/function";
import * as RemoteData from "@devexperts/remote-data-ts";

import { removeDupplicates } from "../helpers/array";
import { useStore } from "./useStore";
import { stateLens } from "../store/State";
import { onSuccess } from "../helpers/remoteData";

const lockKeysLens = stateLens.fromProperty("lockKeys");

export const useLockKey = () => {
  const [lockKeys, setLockKeys] = useStore(lockKeysLens);

  const unlock = (lockKey: string) =>
    pipe(
      lockKeys,
      onSuccess((currentKeys) =>
        setLockKeys(removeDupplicates([...currentKeys, lockKey]))
      )
    );

  const lock = (lockKey: string) =>
    pipe(
      lockKeys,
      onSuccess((currentKeys) =>
        setLockKeys(currentKeys.filter((key) => key !== lockKey))
      )
    );

  const isUnlocked = (lockKey: string) => {
    return pipe(
      lockKeys,
      RemoteData.map((lockKeys) => lockKeys.includes(lockKey))
    );
  };

  return {
    lockKeys,
    setLockKeys,
    unlock,
    lock,
    isUnlocked,
  };
};
