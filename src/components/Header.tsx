import React from 'react';
import { getColor } from '../theme';
import { Title } from './font/Title';

export function Header({children}: {children: React.ReactNode}) {
  return (
    <div className={`${getColor('primary', 400)} p-3 shadow`}>
      <Title>{children}</Title>
    </div>
  )
}