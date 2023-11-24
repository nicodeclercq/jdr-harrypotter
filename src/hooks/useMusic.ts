import { useSocket } from "./useSocket";
import * as IO from "io-ts";

import { useExternalStore } from "./useExternalStore";
import { usePersistantState } from "./usePersistantState";
import { secrets } from "../secrets";

const decoder = IO.type({
  name: IO.string,
  url: IO.string,
});

type Music = IO.TypeOf<typeof decoder>;

export function useMusic() {
  const [playingMusic, setPlayingMusic] = usePersistantState<string>(
    "AMBIANCE_MUSIC",
    ""
  );
  const { emit } = useSocket();

  const result = useExternalStore<Music, typeof decoder>({
    name: secrets.firebaseCollectionId3,
    decoder,
  });

  const play = (name: string, url: string) => {
    emit({
      type: "playMusic",
      payload: { name, url },
    });
    setPlayingMusic(name);
  };
  const stop = () => {
    emit({
      type: "stopMusic",
    });
    setPlayingMusic("");
  };

  return { ...result, playingMusic, play, stop } as const;
}
