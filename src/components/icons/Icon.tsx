import React from 'react';
import { Body } from './components/body';
import { Book } from './components/book';
import { Dice } from './components/dice';
import { Down } from './components/down';
import { Earth } from './components/earth';
import { Fire } from './components/fire';
import { Lamp } from './components/lamp';
import { Sorcerer } from './components/sorcerer';
import { Soul } from './components/soul';
import { Up } from './components/up';
import { Water } from './components/water';
import { Wind } from './components/wind';

export const ICONS = {
  SORCERER: <Sorcerer />,
  DICE: <Dice />,
  IMPORT: '📥',
  FEU: <Fire />,
  AIR: <Wind />,
  EAU: <Water />,
  TERRE: <Earth />,
  AME: <Soul />,
  CORPS: <Body />,
  BOOK: <Book />,
  LAMP: <Lamp />,
  UP: <Up />,
  DOWN: <Down />,
} as const;

export type IconName = keyof typeof ICONS;

type Props = {
  name: IconName;
}

export function Icon({name}: Props) {
  return (
    <span style={{display:'inline-block'}}>{ICONS[name]}</span>
  );
}