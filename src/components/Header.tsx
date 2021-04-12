import React from 'react';
import { baseColor } from '../theme';
import { Title } from './font/Title';

export function Header({children}: {children: React.ReactNode}) {
  return (
    <div className={`bg-${baseColor}-400 p-3 shadow`}>
      <Title>{children}</Title>
    </div>
  )
}