import { useEffect, useMemo } from "react";
import { pipe } from "fp-ts/function";
import { BehaviorSubject } from "rxjs";
import { io } from "../store/externalStores/providers/firebase";

import { useUser } from "../pages/home/useUser";
import { isJoinMessage, Message } from "../message";
import { onSuccess, sequence } from "../helpers/remoteData";

const DEFAULT_AUTHOR = "Unknown";
const socket = io();
socket.on("message", (data: string) => {
  stream.next(JSON.parse(data));
});

const stream = new BehaviorSubject<Message | undefined>(undefined);
let author: string = DEFAULT_AUTHOR;
let avatar: string = "";

const emit = (message: Message["message"]) => {
  console.log("send", { author: { name: author, avatar }, message });
  if (isJoinMessage(message)) {
    socket.emit("join", author);
  }
  socket.emit(
    "message",
    JSON.stringify({ author: { name: author, avatar }, message })
  );
  stream.next({ author: { name: author, avatar }, message });
};

//@ts-expects-error
window.emit = emit;
window.addEventListener("beforeunload", () => {
  emit({
    type: "quit",
    payload: {
      name: author,
    },
  });
});

export const useSocket = () => {
  const { name, imageUrl } = useUser();

  useEffect(
    () =>
      pipe(
        sequence({ name, imageUrl }),
        onSuccess(({ name, imageUrl }) => {
          if (author !== name) {
            const isNotInit = author === DEFAULT_AUTHOR;
            author = name;
            avatar = imageUrl ?? "";
            if (isNotInit) {
              emit({
                type: "join",
                payload: undefined,
              });
            }
          }
        })
      ),
    [name, imageUrl]
  );
  useEffect(
    () =>
      pipe(
        imageUrl,
        onSuccess((imageUrl) => {
          if (avatar !== imageUrl) {
            avatar = imageUrl ?? "";
          }
        })
      ),
    [imageUrl]
  );
  const result = useMemo(
    () => ({
      emit,
      stream,
    }),
    []
  );

  return result;
};
