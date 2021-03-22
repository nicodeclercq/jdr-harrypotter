import React from 'react';
import { Element } from '../pages/spells/domain/Spell';
import { Color, Tag } from './Tag';

const elements: Record<Element, string> = {
  'Feu': '🔥',
  'Air': '💨',
  'Eau': '💧',
  'Terre': '🌍',
  'Âme': '🧠',
  'Corps': '🚶‍♂️',
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
  return <Tag title={title} color={colors[element]}>{points}&nbsp;{elements[element]}</Tag>
}