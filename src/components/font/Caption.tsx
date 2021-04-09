import React from 'react';

type Props = {children: React.ReactNode};

export function Caption({children}: Props) {
  return (
    <span className="text-sm font-light capitalize">{children}</span>
  )
}