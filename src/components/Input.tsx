import React, { InputHTMLAttributes } from 'react';
import { baseColor } from '../theme';

type Props = {
  onChange: (value: string) => void;
  type: string;
  theme: 'base' | 'neutral'
}

export function Input ({onChange, theme, ...rest}: Props & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'style' | 'onChange'
>) {
  const styles = {
    base: `ring-${baseColor}-200 px-1 border border-${baseColor}-700 rounded placeholder-${baseColor}-800 text-${baseColor}-900 bg-${baseColor}-500 bg-opacity-50`,
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