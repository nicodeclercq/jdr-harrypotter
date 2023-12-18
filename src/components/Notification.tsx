import { useEffect, useState } from "react";
import { identity } from "fp-ts/function";
import {
  isMessageType,
  NotificationService,
  NotificationType,
} from "../NotificationService";
import { useStore } from "../hooks/useStore";
import { Button } from "./Button";
import { State, stateLens } from "../store/State";
import { Avatar } from "./Avatar";
import { RichText } from "./font/RichText";
import { useGame } from "../hooks/useGame";
import { RemoteDataFold } from "./RemoteDataFold";

function Notification({
  notification,
  game,
}: {
  notification: NotificationType;
  game: string;
}) {
  const renderIcon = (notification: NotificationType) => {
    const icons = {
      success: () => (
        <div className="flex items-center justify-center w-10 h-10 p-2 bg-green-500 rounded-full shadow-inner">
          🎉
        </div>
      ),
      failure: () => (
        <div className="flex items-center justify-center w-10 h-10 p-2 bg-red-500 rounded-full shadow-inner">
          😈
        </div>
      ),
      warning: () => (
        <div className="flex items-center justify-center w-10 h-10 p-2 bg-yellow-500 rounded-full shadow-inner">
          ⚠️
        </div>
      ),
      message: ({ avatar, name }: { name: string; avatar: string }) => (
        <Avatar game={game} text={name} url={avatar} />
      ),
    } as const;

    return isMessageType(notification)
      ? icons.message(notification.author)
      : icons[notification.type as "success" | "failure" | "warning"]();
  };

  return (
    <div className="flex flex-row items-center p-4 bg-white rounded shadow-md space-x-2">
      {renderIcon(notification)}
      <span className="flex-grow text-left">
        <RichText>{notification.message}</RichText>
      </span>
      {notification.action && (
        <Button type="primary" onClick={notification.action.run}>
          {notification.action.label}
        </Button>
      )}
    </div>
  );
}

export const useNotification = () => {
  return NotificationService;
};

export function NotificationStack() {
  const { game } = useGame();
  const { remove, subject } = NotificationService;
  const [stack, setStack] = useState(subject.value);
  const [state] = useStore(stateLens);

  useEffect(() => {
    const subscription = subject.subscribe((value) => {
      setStack(value);
    });
    return () => subscription.unsubscribe();
  }, [subject]);

  useEffect(() => {
    stack.forEach((notification) => {
      if (notification.showUntil && !notification.showUntil(state)) {
        remove(notification.id);
      }
    });
  }, [remove, stack, state]);

  return (
    <RemoteDataFold
      data={game}
      onSuccess={(game) => (
        <div
          className="fixed bottom-0 right-0 w-1/3 m-2 space-y-2"
          style={{ zIndex: 2 }}
        >
          {stack.map((notification) => (
            <Notification
              key={notification.id}
              notification={notification}
              game={game}
            />
          ))}
        </div>
      )}
    />
  );
}
