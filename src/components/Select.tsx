import React from 'react';
import { baseColor } from '../theme';

type Props<T extends string> = {
  onChange: (value: T) => void;
  options: {label: string; value:T}[];
}

export function Select<T extends string>({onChange, options}: Props<T>){
  return (
    <select className={`focus:ring-4 ring-${baseColor}-200 px-1 border border-${baseColor}-700 rounded text-${baseColor}-900 bg-${baseColor}-500 bg-opacity-50`} onChange={(e) => onChange(e.target.value as T)}>
      {
        options.map(({value, label}) => <option key={`${label}_${value}`} value={value}>{label}</option>)
      }
    </select>
  );
}