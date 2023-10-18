import { RemoteData } from "@devexperts/remote-data-ts";
import { BehaviorSubject } from "rxjs";
import { State } from "./store/State";

export const notificationTypes = {
  success: "success",
  failure: "failure",
  warning: "warning",
  message: "message",
} as const;

type Type = keyof typeof notificationTypes;
type Notification<T extends Type> = {
  id: string;
  type: T;
  message: string;
  action?: {
    run: () => void;
    label: string;
  };
  showUntil?: (state: RemoteData<Error, State>) => boolean;
} & (T extends "message" ? { author: { name: string; avatar: string } } : {});
export type NotificationType = Notification<Type>;

export const isMessageType = (
  notification: NotificationType
): notification is Notification<"message"> => notification.type === "message";
export const isStatusType = (
  notification: NotificationType
): notification is Notification<"success" | "failure" | "warning"> =>
  ["success", "failure", "warning"].includes(notification.type);

const subject = new BehaviorSubject<Array<NotificationType>>([]);

const add = <T extends Type>({ id, action, ...rest }: Notification<T>) => {
  if (
    subject.value.filter((notification) => notification.id === id).length > 0
  ) {
    return;
  }

  const notification = {
    id,
    ...rest,
    ...(action
      ? {
          action: {
            ...action,
            run: () => {
              remove(id);
              action?.run();
            },
          },
        }
      : {}),
  };

  subject.next([...subject.value, notification]);

  if (!action) {
    setTimeout(() => remove(id), 10000);
  }

  return id;
};

const remove = (id: string) => {
  const newValue = subject.value.filter(
    ({ id: currentId }) => currentId !== id
  );
  subject.next(newValue);
};

export const NotificationService = {
  add,
  remove,
  subject,
};
