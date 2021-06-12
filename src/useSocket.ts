import { useEffect } from 'react';
import { pipe, constVoid } from 'fp-ts/function';
import { BehaviorSubject } from 'rxjs';
import * as RemoteData from '@devexperts/remote-data-ts';
import { io } from 'socket.io-client';

import { useUser } from './pages/home/useUser';
import { Message } from './message';

const DEFAULT_AUTHOR = 'Unknown';
const DOMAIN = 'https://jdr-harrypotter-back.herokuapp.com/';
const socket = io(DOMAIN);
socket.on('message', function(data) {
  stream.next(JSON.parse(data));
});
const stream = new BehaviorSubject<Message | undefined>(undefined);
let author: string = DEFAULT_AUTHOR;

const emit = (message: Message['message']) => {
  console.log('send', message)
  socket.emit('message', JSON.stringify({author, message}));
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

export const useSocket = () =>{
  const { getName } = useUser();
  const name = getName();

  useEffect(
    () => pipe(
      name,
      RemoteData.fold(
        constVoid,
        constVoid,
        constVoid,
        (name) => {
          if (author !== name) {
            if(author === DEFAULT_AUTHOR) {
              emit({
                type: 'join',
                payload:{
                  name
                }
              })
            }
            author = name;
          }
        }
      )
    ),
    [getName, name]
  );

  return {
    emit,
    stream,
  };
}
