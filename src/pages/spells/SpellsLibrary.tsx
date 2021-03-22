import React, { useState } from 'react';
import { useDebounce } from 'react-use';

import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { prepareStringForSearch } from '../../helpers/string';
import * as SpellType from './domain/Spell';
import { Spell } from './Spell';
import { spells } from './spells';
import { useSpell } from './useSpell';

export function SpellsLibrary() {
  const [search, setSearch] = useState('');
  const { add, getUserSpells } = useSpell();
  const userSpells = getUserSpells();

  const [debouncedSearch, setDebouncedValue] = useState<SpellType.Spell[]>(spells);

  useDebounce(
    () => {
      setDebouncedValue(spells
        .filter(spell => {
          if(search){
            return prepareStringForSearch(`${spell.name} ${spell.incantation}`).includes(prepareStringForSearch(search));
          }
          return true;
        }));
    },
    200,
    [search]
  );

  return (
    <Card useDividers title={(
      <div className="flex">
        <div className="flex-grow">Liste des Sortilèges</div>
        <input className="rounded-full px-2" type="search" onChange={(e) => {
          setSearch(e.target.value);
        }} placeholder="🔎 Rechercher..."/>
      </div>
      )}
    >
        {
          debouncedSearch
            .map((spell, index) => (
              <Spell
                key={spell.name}
                index={index}
                spell={spell}
                actions={
                  userSpells.includes(spell) ? (<></>) : (
                  <Button onClick={() => add(spell)} type="secondary">Apprendre +</Button>
                )}
              />
            ))
        }
      </Card>
  );
}