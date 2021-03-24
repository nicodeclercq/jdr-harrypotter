import React from 'react';
import { Comment } from './font/Comment';

type Props = {
  children: React.ReactNode;
}
export function Tip({children}: Props) {
  return (
    <div className="my-2 p-2 border border-yellow-500 rounded border-dashed bg-yellow-200">
      <Comment>
        <span className="inline-flex justify-center align-center rounded-full p-2 bg-yellow-400 mr-2 text-xl leading-none w-8 h-8">💡</span> {children}
      </Comment>
    </div>
  )
}