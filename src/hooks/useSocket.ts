import { useEffect } from 'react';
import { pipe } from 'fp-ts/function';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';

import { useUser } from '../pages/home/useUser';
import { Message } from '../message';
import { onSuccess } from '../helpers/remoteData';

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

export const useSocket = () =>{
  const { name, imageUrl } = useUser();

  useEffect(
    () => pipe(
      name,
      onSuccess(
        (name) => {
          if (author !== name) {
            if(author === DEFAULT_AUTHOR) {
              emit({
                type: 'join',
                payload:{
                  name,
                }
              })
            }
            author = name;
          }
        }
      )
    ),
    [name]
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

  return {
    emit,
    stream,
  };
}
