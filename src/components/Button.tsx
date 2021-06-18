import React from 'react';

type Props = {
  type: 'primary' | 'secondary' | 'tertiary',
  onClick: 'submit' | (() => void),
  children: React.ReactNode,
  disabled?: boolean, 
  title?: string;
};

export function Button({type, onClick, title, children, disabled = false}: Props){
  const types = {
    'primary': `bg-blue-500 ${disabled ? '' : 'hover:bg-blue-700'} text-white`,
    'secondary': `bg-white border border-blue-700 ${disabled ? '' : 'hover:bg-blue-100'} text-blue-700`,
    'tertiary': `bg-yellow-300 ${disabled ? '' : 'hover:bg-yellow-500'} text-black`,
  } as const;

  const isSubmit = onClick === 'submit';
  const rest = (isSubmit ? {} :  { onClick }) as {onClick?: () => void};

  return (
    <button title={title} {...rest} type={isSubmit ? 'submit' : 'button'} disabled={disabled} className={`${disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100'} inline-flex justify-center align-center rounded py-1 px-2 text-s ${types[type]}`}>{children}</button>
  )
}