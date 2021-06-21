import React, { useEffect, useState } from 'react';
import { NotificationService, NotificationType } from '../NotificationService';
import { useStore } from '../store/useStore';
import { Button } from './Button';
import { Icon } from './icons/Icon';

function Notification({ action, message, type }: NotificationType) {
  const icons: Record<NotificationType['type'], React.ReactNode> = {
    success: <div className="flex items-center justify-center w-10 h-10 p-2 bg-green-500 rounded-full shadow-inner">🎉</div>,
    failure: <div className="flex items-center justify-center w-10 h-10 p-2 bg-red-500 rounded-full shadow-inner">😈</div>,
    warning: <div className="flex items-center justify-center w-10 h-10 p-2 bg-yellow-500 rounded-full shadow-inner">⚠️</div>,
    message: <Icon name="CHARACTER" />
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
  return NotificationService;
};

export function NotificationStack(){
  const { remove, subject } = NotificationService;
  const [stack, setStack] = useState(subject.value);
  const { getState } = useStore();

  const state = getState();

  useEffect(() => {
    const subscription = subject.subscribe((value) => {
      setStack(value);
    });
    return () => subscription.unsubscribe();
  },[subject]);

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