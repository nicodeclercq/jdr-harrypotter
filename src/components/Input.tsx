import React, { InputHTMLAttributes } from 'react';

type Props = {
  onChange: (value: string) => void;
  type: string;
  theme: 'yellow' | 'neutral'
}

export function Input ({onChange, theme, placeholder, ...rest}: Props & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'style' | 'onChange'
>) {
  const styles = {
    yellow: 'ring-yellow-200 px-1 border border-yellow-500 rounded placeholder-yellow-600 text-yellow-900 bg-yellow-500 bg-opacity-50',
    neutral: 'ring-gray-200 px-1 border border-gray-500 rounded placeholder-gray-600 text-gray-900 bg-gray-200 bg-opacity-50'
  }

  return (
    <input
      {...rest}
      className={`focus:ring-4 ${styles[theme]}`}
      onChange={e => onChange(e.target.value)}
    />
  );
};