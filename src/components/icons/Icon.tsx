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
import { Backpack } from './components/backpack';
import { Coin } from './components/coin';
import { Notebook } from './components/notebook';
import { Abacus } from './components/abacus';
import { JigsawBox } from './components/jigsaw-box';
import { Potion } from './components/potion';
import { Sword } from './components/sword';
import { Upgrade } from './components/upgrade';
import { Shield } from './components/shield';
import { HeartBottle } from './components/heart-bottle';
import { Check } from './components/check';
import { Cross } from './components/cross';
import { Ingredients } from './components/ingredients';
import { Cauldron } from './components/cauldron';
import { Sleepy } from './components/sleepy';
import { Halt } from './components/halt';
import { Pen } from './components/pen';

export const ICONS = {
  SORCERER: <Sorcerer />,
  DICE: <Dice />,
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
  BACKPACK: <Backpack />,
  COIN: <Coin />,
  NOTEBOOK: <Notebook />,
  ABACUS: <Abacus />,
  JIGSAW_BOX: <JigsawBox />,
  POTION: <Potion />,
  SWORD: <Sword />,
  UPGRADE: <Upgrade />,
  SHIELD: <Shield />,
  HEART_BOTTLE: <HeartBottle />,
  CHECK: <Check />,
  CROSS: <Cross />,
  INGREDIENTS: <Ingredients />,
  CAULDRON: <Cauldron />,
  SLEEPY: <Sleepy />,
  HALT: <Halt />,
  PEN: <Pen />,
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
