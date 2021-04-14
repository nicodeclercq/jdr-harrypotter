import React from 'react';
import { getColor } from '../theme';

type Props<T extends string> = {
  onChange: (value: T) => void;
  options: {label: string; value:T}[];
}

export function Select<T extends string>({onChange, options}: Props<T>){
  return (
    <select className={`focus:ring-4  ${getColor('primary', 200, 'ring')} px-1 border  ${getColor('primary', 700, 'border')} rounded  ${getColor('primary', 900, 'border')}  ${getColor('primary', 500)} bg-opacity-50`} onChange={(e) => onChange(e.target.value as T)}>
      {
        options.map(({value, label}) => <option key={`${label}_${value}`} value={value}>{label}</option>)
      }
    </select>
  );
}