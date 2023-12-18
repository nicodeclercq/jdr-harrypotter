import { useCallback, useEffect, useRef } from "react";
import { constVoid, pipe } from "fp-ts/function";
import { BehaviorSubject } from "rxjs";
import { distinctUntilChanged, filter } from "rxjs/operators";

import { useNotification } from "./components/Notification";
import {
  AlertMessage,
  fold,
  HasAlreadyJoinedMessage,
  ChatMessage,
  JoinMessage,
  Message,
  QuitMessage,
  RollMessage,
  PlayMusicMessage,
  SetBattleMapTokensPosition,
  COMMAND_MESSAGE,
  GiveACardMessage,
  PlayACardMessage,
  ResetCardsMessage,
} from "./message";
import { useRole } from "./hooks/useRole";
import { ChatBoxes } from "./pages/home/ChatBoxes";
import { fromRemoteData, onSuccess } from "./helpers/remoteData";
import { Time } from "./pages/home/Time";
import { useUser } from "./pages/home/useUser";
import { useSound } from "./hooks/useSound";
import { useBenny as useBennyHook } from "./hooks/useBenny";
import { useConnectedUsers } from "./hooks/useConnectedUsers";
import { useLockKey } from "./hooks/useLockKey";
import { useTokens } from "./hooks/useTokens";
import { values } from "./helpers/object";
import { ROUTES, RouteDefinition } from "./Router";
import { useDeck } from "./pages/cards/useDeck";

type Props = {
  currentUserName: string;
  stream: BehaviorSubject<Message | undefined>;
  emit: (message: Message["message"]) => void;
};

let runNb = 20;

export function SocketMessageHandler({ currentUserName, stream, emit }: Props) {
  const { unlock, lock } = useLockKey();
  const { setTokens } = useTokens();
  const { setCards, giveACard, addCardToHand, addCardToTable, clearCardTable } =
    useDeck();
  const {
    connectedUsers,
    add: connectUser,
    remove: disconnectUser,
  } = useConnectedUsers();
  const { add: notify } = useNotification();
  const { isMJ } = useRole();
  const { user } = useUser();
  const { play } = useSound();
  const { addBenny } = useBennyHook();
  const musicRef = useRef<HTMLAudioElement>(null);

  const hasAlreadyJoined = useCallback(
    (
      { recipient }: HasAlreadyJoinedMessage["payload"],
      author: Message["author"]
    ) => {
      if (recipient === currentUserName) {
        connectUser(author.name, author.avatar);
      }
    },
    [currentUserName, connectUser]
  );

  const join = useCallback(
    (_: JoinMessage["payload"], author: Message["author"]) => {
      connectUser(author.name, author.avatar);
      notify({
        id: `join_${author.name}`,
        type: "message",
        message: `${author.name} vient de rejoindre la partie`,
        author: {
          name: author.name,
          avatar: author.avatar ?? "",
        },
      });
      emit({
        type: "hasAlreadyJoined",
        payload: {
          recipient: author.name,
        },
      });
    },
    [notify, emit, connectUser]
  );

  const quit = useCallback(
    ({ name }: QuitMessage["payload"], author: Message["author"]) => {
      disconnectUser(author.name);
      notify({
        id: `quit_${name}`,
        type: "success",
        message: `${name} vient de quitter la partie`,
      });
    },
    [notify, disconnectUser]
  );

  const chat = useCallback(
    (
      { message, recipient }: ChatMessage["payload"],
      author: Message["author"]
    ) => {
      if (currentUserName === recipient) {
        if (message === COMMAND_MESSAGE.GIVE_BENNY) {
          notify({
            id: `chat_${recipient}${message}`,
            type: "message",
            message: "Tu as gagné un nouveau Joker",
            author: { name: author.name, avatar: author.avatar ?? "" },
          });
          addBenny();
        } else if (COMMAND_MESSAGE.UNLOCK.test(message)) {
          const lockKeys = values(ROUTES)
            .filter(
              ({ lockKey }: RouteDefinition) => typeof lockKey !== "function"
            )
            .map(({ lockKey }: RouteDefinition) => lockKey);
          const result = COMMAND_MESSAGE.UNLOCK.exec(message);
          if (result) {
            if (
              result?.length >= 2 &&
              (lockKeys as string[]).includes(result[1])
            ) {
              notify({
                id: `chat_${recipient}${message}`,
                type: "success",
                message: "Nouvelle capacité débloquée",
              });
              unlock(result[1]);
            }
          }
        } else if (COMMAND_MESSAGE.LOCK.test(message)) {
          const lockKeys = values(ROUTES)
            .filter(
              ({ lockKey }: RouteDefinition) => typeof lockKey !== "function"
            )
            .map(({ lockKey }: RouteDefinition) => lockKey);
          const result = COMMAND_MESSAGE.LOCK.exec(message);
          if (result) {
            if (
              result?.length >= 2 &&
              (lockKeys as string[]).includes(result[1])
            ) {
              notify({
                id: `chat_${recipient}${message}`,
                type: "failure",
                message: "Vous venez de perdre une capacité",
              });
              lock(result[1]);
            }
          }
        } else {
          notify({
            id: `chat_${recipient}${message}`,
            type: "message",
            message: `“${message}”`,
            author: { name: author.name, avatar: author.avatar ?? "" },
          });
          play("bip");
        }
      }
    },
    [notify, addBenny, currentUserName, lock, play, unlock]
  );

  const roll = useCallback(
    (
      { title, value, type }: RollMessage["payload"],
      author: Message["author"]
    ) => {
      const types = {
        "critical-success": "Succés critique",
        success: "Succés",
        failure: "Échec",
        "critical-failure": "Échec critique",
        "free-throw": "Lancer libre",
      } as const;
      play("dice-short");

      const timeout = setTimeout(() => {
        notify({
          id: `roll_${author}_${title}_${value}`,
          type: "message",
          message: `"${title}": ${author.name} vient de faire ${value} (${types[type]})`,
          author: { name: author.name, avatar: author.avatar ?? "" },
        });
        if (type === "critical-success") {
          play("success");
        } else if (type === "critical-failure") {
          play("failure");
        }
      }, 1000);
      return () => clearTimeout(timeout);
    },
    [notify, play]
  );

  const alert = useCallback(
    ({ type }: AlertMessage["payload"], author: Message["author"]) => {
      if (type === "playerIsAsleep") {
        pipe(
          isMJ,
          onSuccess((isCurrentUserMJ) => {
            if (isCurrentUserMJ) {
              notify({
                id: `sleepy_${author.name}`,
                type: "message",
                message: `${author.name} s'ennuie`,
                author: {
                  name: author.name,
                  avatar: author.avatar ?? "",
                },
              });
              play("sleep");
            }
          })
        );
      }
      if (type === "playerNeedsPause") {
        notify({
          id: `halt_${author.name}`,
          type: "message",
          message: `${author.name} veut faire une pause`,
          author: {
            name: author.name,
            avatar: author.avatar ?? "",
          },
        });
        play("error");
      }
    },
    [notify, isMJ, play]
  );

  const useBenny = useCallback(
    (_payload: undefined, author: Message["author"]) => {
      pipe(
        isMJ,
        onSuccess((isCurrentUserMJ) => {
          if (isCurrentUserMJ) {
            addBenny();
          }
          notify({
            id: `benny_${author.name}`,
            type: "message",
            message: `${author.name} à utilisé un Joker`,
            author: {
              name: author.name,
              avatar: author.avatar ?? "",
            },
          });
        })
      );
    },
    [notify, addBenny, isMJ]
  );

  const resetCards = useCallback(
    (cards: ResetCardsMessage["cards"], _author: Message["author"]) => {
      setCards(cards);
    },
    [setCards]
  );

  const drawACard = (_payload: undefined, author: Message["author"]) => {
    pipe(
      isMJ,
      onSuccess((isCurrentUserMJ) => {
        if (isCurrentUserMJ) {
          giveACard(author.name);
          notify({
            id: `give-a-card_${author.name}`,
            type: "message",
            author: {
              name: author.name,
              avatar: author.avatar ?? "",
            },
            message: `${author.name} a pioché une carte`,
          });
        }
      })
    );
  };

  const getACard = (payload: GiveACardMessage["payload"]) => {
    if (payload.recipient === currentUserName) {
      addCardToHand(payload.card);
    }
  };

  const playACard = useCallback(
    (payload: PlayACardMessage["payload"]) => {
      addCardToTable(payload);
    },
    [addCardToTable]
  );
  const dropAllCardsFromTable = useCallback(() => {
    clearCardTable();
  }, [clearCardTable]);

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = 0.1;
    }
  }, [musicRef]);

  const playMusic = useCallback(
    ({ url }: PlayMusicMessage["payload"]) => {
      if (musicRef.current) {
        musicRef.current.src = url;
        musicRef.current.title = url;
        musicRef.current.play();
      }
    },
    [musicRef]
  );
  const stopMusic = useCallback(() => {
    if (musicRef.current) {
      musicRef.current.src = "";
      musicRef.current.title = "";
      musicRef.current.pause();
    }
  }, [musicRef]);

  const setBattleMapTokensPosition = useCallback(
    (payload: SetBattleMapTokensPosition["payload"]) => {
      pipe(
        isMJ,
        onSuccess((isCurrentUserMJ) => {
          if (!isCurrentUserMJ) {
            setTokens(payload);
          }
        })
      );
    },
    [isMJ, setTokens]
  );

  const onMessage = useCallback(
    (message: unknown) => {
      return fold(currentUserName, {
        hasAlreadyJoined,
        join,
        quit,
        roll,
        chat,
        alert,
        time: constVoid,
        image: constVoid,
        useBenny,
        playMusic,
        stopMusic,
        setBattleMapTokensPosition,
        resetCards,
        drawACard,
        giveACard: getACard,
        playACard,
        clearCardTable: dropAllCardsFromTable,
      })(message);
    },
    [
      alert,
      chat,
      currentUserName,
      hasAlreadyJoined,
      join,
      playMusic,
      quit,
      roll,
      stopMusic,
      useBenny,
      setBattleMapTokensPosition,
      resetCards,
      drawACard,
      getACard,
      addCardToTable,
      dropAllCardsFromTable,
    ]
  );

  useEffect(() => {
    if (currentUserName) {
      const subscription = stream
        .asObservable()
        .pipe(
          filter((message) => message != null),
          distinctUntilChanged()
        )
        .subscribe({
          next: (message: unknown) => {
            if (runNb > 0) {
              // ensures no infinite cycles
              onMessage(message);
            } else {
              throw new Error("Infinite rerendering");
            }
          },
        });

      return () => {
        subscription.unsubscribe();
        runNb--;
      };
    }
  }, [currentUserName]);

  return pipe(
    user,
    fromRemoteData((user) => (
      <>
        <ChatBoxes me={user} users={connectedUsers} />
        <Time />
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: "16rem",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        >
          <audio ref={musicRef} controls loop />
        </div>
      </>
    ))
  );
}
