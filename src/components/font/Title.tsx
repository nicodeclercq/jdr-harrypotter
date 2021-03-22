import React from 'react';

export function Title({children}: {children: React.ReactNode}) {
  return (
    <div className="text-xl font-medium">{children}</div>
  )
}