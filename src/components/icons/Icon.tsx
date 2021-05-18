import React from 'react';
import { Animal } from './components/animal';
import { Body } from './components/body';
import { Book } from './components/book';
import { Dice } from './components/dice';
import { Down } from './components/down';
import { Earth } from './components/earth';
import { Fire } from './components/fire';
import { Lamp } from './components/lamp';
import { Objects } from './components/objects';
import { Plant } from './components/plant';
import { Sorcerer } from './components/sorcerer';
import { Soul } from './components/soul';
import { Up } from './components/up';
import { Water } from './components/water';
import { Wind } from './components/wind';
import { Character } from './components/character';
import { Skills } from './components/skills';
import { Heart } from './components/heart';
import { Rune } from './components/rune';
import { Card } from './components/card';

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
  ANIMAL: <Animal />,
  OBJECT: <Objects />,
  PLANT: <Plant />,
  CHARACTER: <Character />,
  SKILLS: <Skills />,
  HEART: <Heart />,
  RUNE: <Rune />,
  CARD: <Card />,
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
