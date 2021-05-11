import React from 'react';

export function Incantation({children}: {children: React.ReactNode}) {
  return <span className="text-lg italic font-extralight">{children}</span>
}