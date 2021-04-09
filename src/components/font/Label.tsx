import React from 'react';

type Props = {
  htmlFor: string;
  children: React.ReactNode;
};

export function Label({htmlFor, children}: Props) {
  return (
    <label htmlFor={htmlFor} className="flex-grow text-sm font-light capitalize">{children}</label>
  )
}