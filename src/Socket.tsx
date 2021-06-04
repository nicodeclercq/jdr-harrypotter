import React from 'react';
import { io } from 'socket.io-client';

const DOMAIN = 'ws://localhost:5000/';

type Props = {
  children: React.ReactNode,
}
const socket = io(DOMAIN, {
  closeOnBeforeunload: true,
  host: DOMAIN,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});

socket.on('connect', () => {
  console.log('connected', socket.id);
});

export function Socket({children}: Props){
  return (
    <>
      {children}
    </>
  )
} 