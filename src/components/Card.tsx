import React from 'react';
import { Header } from './Header';

type Props = {
  children: React.ReactNode,
  useDividers?: boolean,
  title?: React.ReactNode,
  fullWidth?: boolean,
}

export function Card({ children, title, useDividers = false, fullWidth = false}: Props) {
  return (
    <div className={`flex flex-col ${fullWidth ? 'w-full' : ''} max-h-full overflow-hidden text-left bg-white rounded-lg shadow shadow-md`}>
      {title && <Header>{title}</Header>}
      <div className={`flex-grow ${useDividers ? 'divide-y divide-solid overflow-y-auto' : ''}`}>
        {children}
      </div>
    </div>
  )
}