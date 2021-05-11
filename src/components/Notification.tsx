import { RemoteData } from '@devexperts/remote-data-ts';
import React, { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { State, useStore } from '../useStore';
import { Button } from './Button';

type NotificationType = {
  id: string;
  type: 'success' | 'failure' | 'warning';
  message: string;
  action?: {
    run: () => void;
    label: string;
  },
  showUntil?: (state: RemoteData<Error, State>) => boolean;
};

const subject = new BehaviorSubject<Array<NotificationType>>([]);

function Notification({ action, message, type }: NotificationType) {
  const icons: Record<NotificationType['type'], React.ReactNode> = {
    success: <div className="flex items-center justify-center w-10 h-10 p-2 bg-green-500 rounded-full shadow-inner">🎉</div>,
    failure: <div className="flex items-center justify-center w-10 h-10 p-2 bg-red-500 rounded-full shadow-inner">😈</div>,
    warning: <div className="flex items-center justify-center w-10 h-10 p-2 bg-yellow-500 rounded-full shadow-inner">⚠️</div>,
  }

  return (
    <div className="flex flex-row items-center p-4 bg-white rounded shadow-md space-x-2">
      {icons[type]}
      <span className="flex-grow text-left">{message}</span>
      {
        action && <Button type="primary" onClick={action.run}>{action.label}</Button>
      }
    </div>
  )
}

export const useNotification = () => {
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

  return {
    add,
    remove,
  }
};

export function NotificationStack(){
  const { remove } = useNotification();
  const [stack, setStack] = useState(subject.value);
  const { getState } = useStore();

  const state = getState();

  useEffect(() => {
    const subscription = subject.subscribe((value) => {
      setStack(value);
    });
    return () => subscription.unsubscribe();
  },[]);

  useEffect(() => {
    stack.forEach((notification) => {
      if(notification.showUntil && !notification.showUntil(state)) {
        remove(notification.id);
      }
    });
  }, [remove, stack, state]);

  return (
    <div className="fixed bottom-0 right-0 w-1/3 m-2 space-y-2">
      {
        stack.map((notification) => (
          <Notification key={notification.id} id={notification.id} message={notification.message} type={notification.type} action={notification.action} />)
        )
      }
    </div>
  )
}