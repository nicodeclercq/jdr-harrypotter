import React from 'react';
import { Element } from '../pages/spells/domain/Spell';
import { Icon, IconName } from './Icon';
import { Color, Tag } from './Tag';

const elements: Record<Element, IconName> = {
  'Feu': 'FEU',
  'Air': 'AIR',
  'Eau': 'EAU',
  'Terre': 'TERRE',
  'Âme': 'AME',
  'Corps': 'CORPS',
};

const colors: Record<Element, Color> = {
  'Feu': 'yellow',
  'Air': 'gray',
  'Eau': 'blue',
  'Terre': 'green',
  'Âme': 'purple',
  'Corps': 'pink',
};

export function ElementTag({element, title, points}: {element: Element, title: string, points: number}) {
  return <Tag title={title} color={colors[element]}>{points}&nbsp;<Icon name={elements[element]} /></Tag>
}