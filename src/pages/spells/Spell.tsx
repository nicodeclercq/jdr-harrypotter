import React from 'react';
import { BodyText } from '../../components/font/BodyText';
import { Incantation } from '../../components/font/Incantation';
import { Tag, Color } from '../../components/Tag';
import { Accordion } from '../../components/Accordion';
import * as SpellType from './domain/Spell';
import { Button } from '../../components/Button';
import { Icon, IconName } from '../../components/icons/Icon';

const baseElements: Record<string, string> = {
  'feu': 'FEU',
  'air': 'AIR',
  'terre': 'PLANT',
  'eau': 'EAU',
}

const elements: Record<SpellType.Category, IconName> = {
  'feu': 'FEU',
  'air': 'AIR',
  'terre': 'PLANT',
  'eau': 'EAU',
  'annulation': "CROSS",
  'attaque simple': "SWORD",
  'détection magique': "LAMP",
  'lévitation': "CORPS",
  'sort de base': "SORCERER",
  'métamorphose': "ANIMAL"
};

const colors: Record<SpellType.Category, Color> = {
  'feu': 'red',
  'air': 'red',
  'terre': 'red',
  'eau': 'red',
  'annulation': "indigo",
  'attaque simple': "yellow",
  'détection magique': "pink",
  'lévitation': "green",
  'sort de base': "blue",
  'métamorphose': "purple"
};

type Props = {
  roll?: (name: string) => void;
  spell: SpellType.Spell;
  isOwned?: boolean;
  actions?: React.ReactNode;
  canBeAdded?: boolean;
};

export function Spell({spell, roll, actions, isOwned = false, canBeAdded = false}: Props) {
  return (
    <Accordion>
      {{
        header: (
          <div className="flex">
            <div className="flex items-center flex-grow text-left capitalize space-x-2">
              <Tag color="white" title={`Niveau ${spell.level}`}>{spell.level}</Tag>
              <Incantation>{spell.incantation}</Incantation>
              <div className="flex-grow">
                <BodyText>{spell.name}</BodyText>
              </div>
              {canBeAdded && <span className="text-green-600"><Icon name="CHECK" /></span>}
              <Tag title={spell.category} color={colors[spell.category]}>
                <Icon name={elements[spell.category]} />
                {baseElements[spell.category] ? ` ${spell.category}` : ''}
              </Tag>
            </div>
          </div>
        ),
        content: (
          <div className="flex flex-col space-y-2">
            <hr className="border-y"/>
            <BodyText>{spell.description}</BodyText>
            {actions && <div className="flex flex-row-reverse m-2 space-x-2">{actions}</div>}
          </div>
        ),
        actions: isOwned && roll
            && (
                <Button onClick={() => roll(spell.name)} type="secondary">
                  <Icon name="DICE" />
                </Button>
              )
      }}
    </Accordion>
  )
}