import React from 'react';
import { Caption } from './font/Caption';

export type Color = 'white' | 'gray' | 'yellow' | 'indigo' | 'blue' | 'pink' | 'purple' | 'red' | 'green';

export function Tag({color, title, children}: {color: Color, title: string, children: React.ReactNode}) {
  const colors = {
    'gray': 'bg-gray-200 border-gray-700 text-gray-700',
    'yellow': 'bg-yellow-200 border-yellow-700 text-yellow-700',
    'indigo': 'bg-indigo-200 border-indigo-700 text-indigo-700',
    'blue': 'bg-blue-200 border-blue-700 text-blue-700',
    'pink': 'bg-pink-200 border-pink-700 text-pink-700',
    'purple': 'bg-purple-200 border-purple-700 text-purple-700',
    'red': 'bg-red-200 border-red-700 text-red-700',
    'green': 'bg-green-200 border-green-700 text-green-700',
  };


  const tagColor = color === 'white'
    ? `bg-gray-000 text-gray-500 border border-gray-500`
    : `${colors[color]} text-${color}-700 border`

  return (
    <span title={title} className={`inline-flex items-center rounded-full px-2 border ${tagColor}`}>
      <Caption>{children}</Caption>
    </span>
  )
}