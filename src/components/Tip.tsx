import React from 'react';
import { getColor } from '../theme';
import { Comment } from './font/Comment';
import { Icon } from './Icon';

type Props = {
  children: React.ReactNode;
}
export function Tip({children}: Props) {
  return (
    <div className={`my-2 p-2 border  ${getColor('primary', 700, 'border')} rounded border-dashed  ${getColor('primary', 50)}`}>
      <Comment>
        <span className={`inline-flex shadow-inner justify-center align-center rounded-full p-2  ${getColor('primary', 600)} mr-2 text-xl leading-none w-8 h-8`}><Icon name="LAMP" /></span> {children}
      </Comment>
    </div>
  )
}