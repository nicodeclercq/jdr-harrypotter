import { RemoteData } from '@devexperts/remote-data-ts';
import { BehaviorSubject } from 'rxjs';
import { State } from './store/State';

export type NotificationType = {
  id: string;
  type: 'success' | 'failure' | 'warning' | 'message';
  message: string;
  action?: {
    run: () => void;
    label: string;
  },
  showUntil?: (state: RemoteData<Error, State>) => boolean;
};

const subject = new BehaviorSubject<Array<NotificationType>>([]);

const add = ({ id, action, ...rest }: NotificationType) => {
  if(subject.value.filter(notification => notification.id === id).length > 0) {
    return;
  }

  const notification = {
    id,
    ...rest,
    ...(
      action
        ? {
            action: {
              ...action,
              run: () => {
                remove(id);
                action?.run();
              },
            }
          }
        : {}
    ),
  };

  subject.next([
    ...subject.value,
    notification
  ]);

  if (!action) {
    setTimeout(() => remove(id), 10000);
  }

  return id;
};

const remove = (id: string) => {
  const newValue = subject.value.filter(({id: currentId}) => currentId !== id);
  subject.next(newValue);
}

export const NotificationService = {
  add,
  remove,
  subject,
};
