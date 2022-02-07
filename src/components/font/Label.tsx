import React from 'react';

type Props = {
  htmlFor: string;
  children: React.ReactNode;
  gridArea?: string;
};

export function Label({htmlFor, children, gridArea}: Props) {
  return (
    <label htmlFor={htmlFor} className="flex-grow text-sm font-light capitalize" style={{gridArea}}>{children}</label>
  )
}