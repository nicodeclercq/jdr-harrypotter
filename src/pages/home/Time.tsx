import { useEffect, useState } from "react";
import { interval } from "rxjs";
import * as RX from "rxjs/operators";
import { isDefined } from "../../helpers/nullable";

import { useSocket } from "../../hooks/useSocket";
import { useSound } from "../../hooks/useSound";
import { isTimeMessage } from "../../message";

export function Time() {
  const [time, setTime] = useState<number | undefined>(undefined);
  const { stream } = useSocket();
  const { play } = useSound();

  const getColor = (time: number | undefined) => {
    if (time == null) {
      return;
    }
    if (time > 6) {
      return "yellow";
    }
    if (time > 3) {
      return "orange";
    }
    return "red";
  };

  useEffect(() => {
    const subscription = stream
      .asObservable()
      .pipe(
        RX.filter(isDefined),
        RX.map((message) => message.message),
        RX.filter(isTimeMessage),
        RX.distinctUntilChanged(),
        RX.switchMap(({ payload }) =>
          interval(1000).pipe(
            RX.takeWhile((i) => i <= payload + 1),
            RX.map((i) => payload - i)
          )
        )
      )
      .subscribe({
        next: (time) => {
          setTime(time >= 0 ? time : undefined);
          if (time === 0) {
            play("time");
          }
        },
      });
    return () => subscription.unsubscribe();
  }, [stream, play]);

  return (
    <div
      style={{
        position: "fixed",
        fontSize: "20rem",
        color: getColor(time),
        textShadow: "1rem 1rem 1rem rgba(0,0,0,0.25)",
        pointerEvents: "none",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
      }}
    >
      {time != null ? time : ""}
    </div>
  );
}
