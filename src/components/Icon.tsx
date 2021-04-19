import React from 'react';

export const ICONS = {
  SORCERER: '🧙‍♀️',
  DICE: '🎲',
  IMPORT: '📥',
  FEU: '🔥',
  AIR: '💨',
  EAU: '💧',
  TERRE: '🌍',
  AME: '🧠',
  CORPS: '🚶‍♂️',
  BOOK: '📖',
  LAMP: '💡',
  UP: '▲',
  DOWN: '▼',
} as const;

export type IconName = keyof typeof ICONS;

type Props = {
  name: IconName;
}

export function Icon({name}: Props) {
  return (
    <>{ICONS[name]}</>
  );
}