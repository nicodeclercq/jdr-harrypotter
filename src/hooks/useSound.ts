import { useCallback } from "react";
const sounds = [
  "bip",
  "dice",
  "dice-short",
  "sleep",
  "error",
  "success",
  "failure",
  "time",
] as const;

type Sound = (typeof sounds)[number];

export function useSound() {
  const play = useCallback((name: Sound) => {
    const sound = document.getElementById(`sound-${name}`) as HTMLAudioElement;
    sound.play();
  }, []);

  return {
    play,
  };
}