import React from 'react';
import { Comment } from './font/Comment';

type Props = {
  children: {
    emoji: string;
    title: string;
    description: string;
  }
};

export function EmptyContent({children:{emoji, title, description}}: Props) {
  return (
  <div className="border rounded border-dashed bg-blue-50 p-2 border-blue-300 m-3 text-center">
    <div className="text-7xl mb-2">{emoji}</div>
    <Comment>
      <strong>{title}</strong>
      <br />
      {description}
    </Comment>
  </div>
  )
}