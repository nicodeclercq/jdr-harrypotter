import React from 'react';

export function BodyText({children}: {children: React.ReactNode}) {
  return <span className="text-md font-normal">{children}</span>
}