import React from 'react';

type Props = {
  onChange: (value: string) => void;
  placeholder: string;
  type: string;
}

export function Input({onChange, placeholder}: Props){
  return (
    <input
      className="focus:ring-4 ring-yellow-200 px-1 border border-yellow-500 rounded placeholder-yellow-600 text-yellow-900 bg-yellow-500 bg-opacity-50"
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}