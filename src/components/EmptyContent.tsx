import React from 'react';
import { getColor } from '../theme';
import { Button } from './Button';
import { Comment } from './font/Comment';

type Props = {
  goTo?: () => void;
  children: {
    emoji: string;
    title: string;
    description: string;
  }
};

export function EmptyContent({goTo, children:{emoji, title, description}}: Props) {
  return (
  <div className={`border rounded border-dashed ${getColor('secondary', 50 )} p-2 ${getColor('secondary', 500, 'border' )} m-3 text-center`}>
    <div className="text-7xl mb-2">{emoji}</div>
    <Comment>
      <strong>{title}</strong>
      <br />
      {description}
      {goTo && <>
        <br/>
        <Button type="secondary" onClick={goTo}>C'est parti</Button>
        </>}
    </Comment>
  </div>
  )
}