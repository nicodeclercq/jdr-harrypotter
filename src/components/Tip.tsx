import React from 'react';
import { baseColor } from '../theme';
import { Comment } from './font/Comment';

type Props = {
  children: React.ReactNode;
}
export function Tip({children}: Props) {
  return (
    <div className={`my-2 p-2 border border-${baseColor}-700 rounded border-dashed bg-${baseColor}-200`}>
      <Comment>
        <span className={`inline-flex justify-center align-center rounded-full p-2 bg-${baseColor}-400 mr-2 text-xl leading-none w-8 h-8`}>💡</span> {children}
      </Comment>
    </div>
  )
}