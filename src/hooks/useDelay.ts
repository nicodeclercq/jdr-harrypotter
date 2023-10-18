import { useEffect, useRef } from "react";

export function useDelay(time: number, callback: () => void) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const timeout = setTimeout(
      () => { savedCallback.current(); },
      time
    );
    return () => clearTimeout(timeout);
  }, [time, callback]);
}