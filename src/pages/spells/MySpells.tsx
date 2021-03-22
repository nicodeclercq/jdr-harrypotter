import React from 'react';

import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { ElementTag } from '../../components/ElementTag';
import { EmptyContent } from '../../components/EmptyContent';
import { Comment } from '../../components/font/Comment';
import * as SpellType from './domain/Spell';
import { Spell } from './Spell';
import { useSpell } from './useSpell';

function ElementsCount({spells}: {spells: SpellType.Spell[]}){
  const { getUsages } = useSpell();

  const usages = getUsages();

  const initialCount: Record<SpellType.Element, number>  = {
    Air: 0,
    Corps: 0,
    Eau: 0,
    Feu: 0,
    Terre: 0,
    Âme: 0,
  };
  const result = spells.reduce((acc, spell, index) => {
    const uses = usages[spell.name] ?? 0;
    const points = SpellType.getSpellPoints(index, spell, uses);
    
    return {
      Air: acc.Air + (points.Air),
      Corps: acc.Corps + (points.Corps),
      Eau: acc.Eau + (points.Eau),
      Feu: acc.Feu + (points.Feu),
      Terre: acc.Terre + (points.Terre),
      Âme: acc.Âme + (points.Âme),
    }
  }, initialCount);

  return (
    <div className="space-x-2">
    {
      Object.entries(result)
        .filter(([, value]) => value !==0)
        .map(([name, value]) => <ElementTag key={name} points={value} title={`${value} points ${name}`} element={name as SpellType.Element} />)
    }</div>
  );
}

export function MySpells() {
  const { getUserSpells, remove } = useSpell();

  const userSpells = getUserSpells();

  return (
    <Card useDividers title={(
      <div className="flex space-x-2">
        <span className="flex-grow">Mes Sortilèges</span>
        <ElementsCount spells={userSpells} />
      </div>)}>
      {
        userSpells.length
          ? userSpells.map((spell, index) => (
            <Spell
              key={spell.name}
              index={index}
              spell={spell}
              actions={(
                <Button onClick={() => remove(spell)} type="secondary">Supprimer -</Button>
              )}
              isOwned
            />
          ))
          : (<EmptyContent>
              {{
                emoji: '📖',
                title: 'Tu ne connais encore rien ?',
                description: 'Il va falloir te mettre au travail vite fait mon petit gars!'
              }}
            </EmptyContent>)
      }
    </Card>
  );
}