import React, { useEffect } from "react";
import * as RX from "rxjs/operators";
import { isDefined } from "../helpers/nullable";
import { usePersistantState } from "../hooks/usePersistantState";
import { useSocket } from "../hooks/useSocket";
import { isImageMessage } from "../message";

export function ImagePreview() {
  const [background, setBackground] = usePersistantState<string | undefined>(
    "AMBIANCE_SELECTED_IMAGE"
  );
  const { stream } = useSocket();

  useEffect(() => {
    const subscription = stream
      .asObservable()
      .pipe(
        RX.filter(isDefined),
        RX.map((message) => message.message),
        RX.filter(isImageMessage),
        RX.distinctUntilChanged()
      )
      .subscribe({
        next: ({ payload }) => {
          setBackground(payload);
        },
      });
    return () => subscription.unsubscribe();
  }, [stream]);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: `url("${background}") no-repeat center center / contain`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        borderRadius: "0.5rem",
        maxHeight: "100vh",
        width: "100vw",
        height: "100vw",
        pointerEvents: "none",
        aspectRatio: "4 / 3",
      }}
    />
  );
}
