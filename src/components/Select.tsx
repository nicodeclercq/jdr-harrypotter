import React from 'react';
import { getColor } from '../theme';

type Props<T extends string> = {
  id?: string;
  onChange: (value: T) => void;
  options: {label: string; value:T}[];
  value?: T;
  width?: string;
  theme?: 'base' | 'neutral';
}

export function Select<T extends string>({id, onChange, options, value, width, theme = 'base'}: Props<T>){
  const styles: Record<'base' | 'neutral', string> = {
    base: `${getColor('primary', 200, 'ring')} px-1 border ${getColor('primary', 700, 'border')}  rounded ${getColor('primary', 800, 'placeholder')} ${getColor('primary', 900, 'foreground')} ${getColor('primary', 500)} bg-opacity-50`,
    neutral: 'ring-gray-200 px-1 border border-gray-500 rounded placeholder-gray-600 text-gray-900 bg-gray-200 bg-opacity-50',
  };

  return (
    <select
      id={id}
      className={`focus:ring-4 h-7 ${styles[theme]}`}
      onChange={(e) => onChange(e.target.value as T)}
      value={value}
      style={width ? {width} : {}}
    >
      {
        options.map(({value, label}) => <option key={`${label}_${value}`} value={value}>{label}</option>)
      }
    </select>
  );
}