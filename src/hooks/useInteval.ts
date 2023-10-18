import { useEffect, useRef } from "react";

export function useInterval(
  callback: (clear: () => void) => void,
  delay: number
) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const clear = () => clearInterval(interval);

    const interval = setInterval(() => savedCallback.current(clear), delay);
    return clear;
  }, [delay]);
}
