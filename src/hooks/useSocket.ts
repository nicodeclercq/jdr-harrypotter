import { useState, useCallback } from 'react';
import { useEffect, useMemo } from 'react';
import { pipe } from 'fp-ts/function';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';

import { useUser } from '../pages/home/useUser';
import { Message } from '../message';
import { onSuccess, sequence } from '../helpers/remoteData';

const DEFAULT_AUTHOR = 'Unknown';
const DOMAIN = 'https://jdr-harrypotter-back.herokuapp.com/';
const socket = io(DOMAIN);
socket.on('message', function(data) {
  stream.next(JSON.parse(data));
});
const stream = new BehaviorSubject<Message | undefined>(undefined);
let author: string = DEFAULT_AUTHOR;
let avatar: string = '';

const emit = (message: Message['message']) => {
  console.log('send', {author: {name: author, avatar}, message});
  socket.emit('message', JSON.stringify({author: {name: author, avatar}, message}));
};

//@ts-ignore
window.emit = emit;
window.addEventListener('beforeunload', () => {
  emit({
    type: 'quit',
    payload:{
      name: author,
    }
  })
});

type CallBack<T extends Message> = (author: T['author'], message: T['message']['payload']) => void;
type Listeners = Record<Message['message']['type'], CallBack<Message>[]>;

export const useSocket = () => {
  const { name, imageUrl } = useUser();
  const [listeners, setListeners] = useState<Listeners>({} as Listeners);

  useEffect(
    () => pipe(
      sequence({name, imageUrl}),
      onSuccess(
        ({name, imageUrl}) => {
          if (author !== name) {
            const isNotInit = author === DEFAULT_AUTHOR;
            author = name;
            avatar = imageUrl ?? '';
            if(isNotInit) {
              emit({
                type: 'join',
                payload: undefined,
              })
            }
          }
        }
      )
    ),
    [name, imageUrl]
  );
  useEffect(
    () => pipe(
      imageUrl,
      onSuccess(
        (imageUrl) => {
          if (avatar !== imageUrl) {
            avatar = imageUrl ?? '';
          }
        }
      )
    ),
    [imageUrl]
  );

  const on = useCallback(
    <T extends Message>(type: T['message']['type'], fn: CallBack<T>) => {
      const newListeners = {
        ...listeners,
        [type]: listeners[type] ? [fn] : [...listeners[type], fn],
      };
      setListeners(newListeners);
      
      return () => setListeners(listeners);
    },
    [listeners]
  );

  const result = useMemo(() => ({
    emit,
    on,
    stream,
  }), [on]);

  return result;
}
