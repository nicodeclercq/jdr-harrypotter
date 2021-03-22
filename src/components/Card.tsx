import React from 'react';
import { Header } from './Header';

export function Card({ children, title, useDividers = false }: { children: React.ReactNode, useDividers?: boolean, title?: React.ReactNode}) {
  return (
    <div className="flex flex-col rounded-lg shadow-md bg-white shadow overflow-hidden text-left max-h-full">
      {title && <Header>{title}</Header>}
      <div className={`flex-grow overflow-y-auto ${useDividers ? 'divide-y divide-solid' : ''}`}>
        {children}
      </div>
    </div>
  )
}