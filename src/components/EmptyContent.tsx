import React from 'react';
import { secondaryColor } from '../theme';
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
  <div className={`border rounded border-dashed bg-${secondaryColor}-50 p-2 border-${secondaryColor}-500 m-3 text-center`}>
    <div className="text-7xl mb-2">{emoji}</div>
    <Comment>
      <strong>{title}</strong>
      <br />
      {description}
    </Comment>
  </div>
  )
}