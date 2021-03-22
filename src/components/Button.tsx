import React from 'react';

export function Button({type, onClick, children}: {type: 'primary' | 'secondary', onClick: () => void, children: React.ReactNode}){
  const types = {
    'primary': 'bg-blue-500 hover:bg-blue-700 text-white',
    'secondary': 'bg-white border border-blue-700 hover:bg-blue-100 text-blue-700',
  } as const;

  return (
    <button onClick={onClick} className={`rounded py-1 px-2 text-s ${types[type]}`}>{children}</button>
  )
}