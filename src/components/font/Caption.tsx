import React from 'react';

export function Caption({children}: {children: React.ReactNode}) {
  return (
    <span className="text-sm font-light capitalize">{children}</span>
  )
}