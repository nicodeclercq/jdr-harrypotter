import React from 'react';

type Props<T extends string> = {
  onChange: (value: T) => void;
  options: {label: string; value:T}[];
}

export function Select<T extends string>({onChange, options}: Props<T>){
  return (
    <select className="focus:ring-4 ring-yellow-200 px-1 border border-yellow-500 rounded text-yellow-900 bg-yellow-500 bg-opacity-50" onChange={(e) => onChange(e.target.value as T)}>
      {
        options.map(({value, label}) => <option key={`${label}_${value}`} value={value}>{label}</option>)
      }
    </select>
  );
}