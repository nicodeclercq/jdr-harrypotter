import React from 'react';

import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { ElementTag } from '../../components/ElementTag';
import { EmptyContent } from '../../components/EmptyContent';
import * as SpellType from './domain/Spell';
import { Spell } from './Spell';
import { spells } from './spells';
import { useSpell } from './useSpell';

function ElementsCount({userSpells}: {userSpells: {id: number; userPoints: Record<SpellType.Element, number>;}[]}){
  const initialCount: Record<SpellType.Element, number>  = {
    Air: 0,
    Corps: 0,
    Eau: 0,
    Feu: 0,
    Terre: 0,
    Âme: 0,
  };

  const result = userSpells.reduce((acc, { id, userPoints }) => {
    const points = SpellType.getSpellPoints(spells[id]);

    return {
      Air: acc.Air + points.Air + userPoints.Air,
      Corps: acc.Corps + points.Corps + userPoints.Corps,
      Eau: acc.Eau + points.Eau + userPoints.Eau,
      Feu: acc.Feu + points.Feu + userPoints.Feu,
      Terre: acc.Terre + points.Terre + userPoints.Terre,
      Âme: acc.Âme + points.Âme + userPoints.Âme,
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

  const userSpells = Object.values(getUserSpells());

  return (
    <Card useDividers title={(
      <div className="flex space-x-2">
        <span className="flex-grow">Mes Sortilèges</span>
        <ElementsCount userSpells={userSpells} />
      </div>)}>
      {
        userSpells.length
          ? userSpells.map((userSpell) => {
              const spell = spells[userSpell.id];
              return (
                <Spell
                  key={spell.id}
                  spell={spell}
                  actions={(
                    <Button onClick={() => remove(spell)} type="secondary">Supprimer -</Button>
                  )}
                  isOwned
                />
              )
            })
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