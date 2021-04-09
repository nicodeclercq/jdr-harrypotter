import React from 'react';
import { Caption } from './font/Caption';

export type Color = 'white' | 'gray' | 'yellow' | 'indigo' | 'blue' | 'pink' | 'purple' | 'red' | 'green';

export function Tag({color, title, children}: {color: Color, title: string, children: React.ReactNode}) {
  const tagColor = color === 'white'
    ? `bg-gray-000 text-gray-500 border border-gray-500`
    : `bg-${color}-200 text-${color}-700 border border-${color}-700`

  return (
    <span title={title} className={`inline-flex items-center rounded-full px-2 border ${tagColor}`}>
      <Caption>{children}</Caption>
    </span>
  )
}