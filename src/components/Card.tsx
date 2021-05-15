import React from 'react';
import { Header } from './Header';

export function Card({ children, title, useDividers = false }: { children: React.ReactNode, useDividers?: boolean, title?: React.ReactNode}) {
  return (
    <div className="flex flex-col max-h-full overflow-hidden text-left bg-white rounded-lg shadow shadow-md">
      {title && <Header>{title}</Header>}
      <div className={`flex-grow ${useDividers ? 'divide-y divide-solid overflow-y-auto' : ''}`}>
        {children}
      </div>
    </div>
  )
}