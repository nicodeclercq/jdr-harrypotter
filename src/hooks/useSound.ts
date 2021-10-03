const sounds = [
  'bip',
  'sleep',
  'error',
  'success',
  'failure',
  'time',
] as const;

type Sound = (typeof sounds)[number];

export function useSound() {
  const play = (name: Sound) => {
    const sound = document.getElementById(`sound-${name}`) as HTMLAudioElement;
    sound.play();
  }

  return {
    play,
  }
}