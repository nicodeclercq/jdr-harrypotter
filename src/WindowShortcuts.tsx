import React, { useEffect } from "react";
import * as RemoteData from "@devexperts/remote-data-ts";
import { pipe, constVoid } from "fp-ts/function";
import { useArithmancy } from "./pages/arithmancy/useArithmancy";
import { useUser } from "./pages/home/useUser";
import { useRune } from "./pages/runes/useRune";
import { ExternalStoreManager } from "./store/externalStores/ExternalStoreManager";
import { useLockKey } from "./hooks/useLockKey";
import { useCallback } from "react";
import { random } from "./helpers/number";
import { useSocket } from "./hooks/useSocket";
import { useSkill } from "./pages/skills/useSkill";
import { ROUTES } from "./Router";
import { useRole } from "./hooks/useRole";
import { useCard } from "./pages/cartomancy/useCard";

export function WindowShortcuts() {
  const { name } = useUser();
  const { setRole } = useRole();
  const { setKnownRunes, learnAllRunes, setAllRunesDefinition } = useRune();
  const { setLockKeys: setKeys, unlock, lock } = useLockKey();
  const { setNumber: setArithmancyNumber } = useArithmancy();
  const { emit } = useSocket();
  const { add: addSkill, remove: removeSkill } = useSkill();
  const { setVisibleCards, shuffleDeck } = useCard();

  const distributeRandomNumber = useCallback(() => {
    const currentUserName = name;
    ExternalStoreManager.getEntries().then((names) =>
      pipe(
        currentUserName,
        RemoteData.map((curName) => names.filter((n) => n !== curName)),
        RemoteData.fold(constVoid, constVoid, constVoid, (filteredNames) => {
          const randomNumbers = filteredNames
            .map((_, i) => i + 1)
            .sort(() => random(-1, 1));
          filteredNames.forEach((name, index) => {
            emit({
              type: "chat",
              payload: {
                message: `n°${randomNumbers[index]}`,
                recipient: name,
                needsConfirmation: true,
              },
            });
          });
        })
      )
    );
  }, [emit, name]);

  useEffect(() => {
    // @ts-expects-error
    window.app = {
      iAmMJ: () => {
        Object.values(ROUTES)
          .filter(({ lockKey }) => typeof lockKey === "string")
          .map(({ lockKey }) => unlock(lockKey as string));
        setRole("MJ");
        learnAllRunes();
        setAllRunesDefinition();
      },
      setKeys,
      setKnownRunes,
      learnAllRunes,
      setAllRunesDefinition,
      unlock,
      lock,
      getUserList: ExternalStoreManager.getEntries,
      deleteUser: ExternalStoreManager.delete,
      clear: () => {
        window.localStorage.removeItem("state");

        location.reload();
      },
      setArithmancyNumber,
      distributeRandomNumber,
      chat: (message: string, recipient: string) =>
        emit({
          type: "chat",
          payload: {
            message,
            recipient,
            needsConfirmation: false,
          },
        }),
      addSkill,
      removeSkill,
      setVisibleCards,
      shuffleDeck,
    };
  }, [
    learnAllRunes,
    setRole,
    setAllRunesDefinition,
    setKeys,
    setKnownRunes,
    unlock,
    setVisibleCards,
    shuffleDeck,
    setArithmancyNumber,
    distributeRandomNumber,
    emit,
    addSkill,
    removeSkill,
    lock,
  ]);

  return <></>;
}
