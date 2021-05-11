import React from 'react';

export function BodyText({children}: {children: React.ReactNode}) {
  return <span className="font-normal text-md">{children}</span>
}