import React from 'react';
import { Title } from './font/Title';

export function Header({children}: {children: React.ReactNode}) {
  return (
    <div className="bg-yellow-400 p-3 shadow">
      <Title>{children}</Title>
    </div>
  )
}