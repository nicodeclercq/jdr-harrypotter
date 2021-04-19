import React, { useState } from 'react';
import { useDebounce } from 'react-use';
import { sortBy, filter } from 'fp-ts/Array'
import { Ord } from 'fp-ts/lib/Ord';
import { pipe } from 'fp-ts/lib/function';
import { reverse } from 'fp-ts/lib/ReadonlyArray';

import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Caption } from '../../components/font/Caption';
import { prepareStringForSearch } from '../../helpers/string';
import * as SpellType from './domain/Spell';
import { Spell } from './Spell';
import { spells } from './spells';
import { useSpell } from './useSpell';
import { Input } from '../../components/Input';
import { Filter } from './Filter';
import { Tip } from '../../components/Tip';
import { fromRemoteData } from '../../helpers/remoteData';
import { getColor } from '../../theme';
import { Icon } from '../../components/Icon';

type Category = 'Level' | 'Name' | 'Incantation' | 'PrimaryElement' | 'SecondaryElement';
type Direction = 'Asc' | 'Desc';

function sortAndFilter (spells: SpellType.Spell[], search: string, orderCategory: Category,
  orderDirection: Direction): SpellType.Spell[] {
  const sorters: Record<Category, Ord<SpellType.Spell>> = {
    Level: SpellType.byLevel,
    Incantation: SpellType.byIncantation,
    Name: SpellType.byName,
    PrimaryElement: SpellType.byPrimaryElement,
    SecondaryElement: SpellType.bySecondaryElement,
  } as const;

  return pipe(
    spells,
    filter((spell) => {
      if(search){
        return prepareStringForSearch(`${spell.level} nom:${spell.name} incantation:${spell.incantation} element:${spell.primaryElement} element:${spell.secondaryElement}`)
          .includes(prepareStringForSearch(search));
      }
      return true;
    }),
    sortBy([sorters[orderCategory]]),
    (arr) =>  orderDirection === 'Asc'
      ? arr
      : reverse(arr),
  ) as SpellType.Spell[];
}

export function SpellsLibrary() {
  const [showFilters, setShowFilters] = useState(false);
  const [orderCategory, setOrderCategory] = useState<Category>('Level');
  const [orderDirection, setOrderDirection] = useState<'Asc' | 'Desc'>('Asc');
  const [search, setSearch] = useState('');
  const { add, getUserSpells } = useSpell();
  const userSpells = getUserSpells();

  const [debouncedSearch, setDebouncedValue] = useState<SpellType.Spell[]>(
    sortAndFilter(Object.values(spells), search, orderCategory, orderDirection)
  );

  useDebounce(
    () => {
      const result = sortAndFilter(Object.values(spells), search, orderCategory, orderDirection);
      setDebouncedValue(result);
    },
    200,
    [search, orderCategory, orderDirection]
  );

  return fromRemoteData(
      userSpells,
      userSpells => (
      <Card useDividers title={(
        <>
        <div className="flex">
          <div className="flex-grow">Liste des Sortilèges</div>
          <Input type="search" theme="base" onChange={setSearch} placeholder="🔎 Rechercher..."/>
          <button className={`px-2 ${getColor('primary', 600, 'foreground')}`} onClick={() => setShowFilters(!showFilters)}><Icon name={showFilters ? 'UP' : 'DOWN'} /></button>
        </div>
        {
          showFilters && (
            <div className={`m-1 p-2 ${getColor('primary', 300)} rounded`}>
              <Caption>Trier par</Caption>
              <Filter
                initialOrderCategory={orderCategory}
                initialOrderDirection={orderDirection}
                onChange={(orderCategory, orderDirection) => {
                  setOrderCategory(orderCategory);
                  setOrderDirection(orderDirection);
                }}
              />
              <Tip>
                Pour une recherche plus précise tu peux rajouter
                <br />
                <strong>«nom:»</strong>, <strong>«incantation:»</strong> ou <strong>«élément:»</strong> au début de la recherche:
                <br />
                <i>Ex: «élément:feu»</i>
              </Tip>
            </div>
          )
        }
        </>
        )}
      >
          {
            debouncedSearch
              .map((spell) => (
                <Spell
                  key={spell.id}
                  spell={spell}
                  actions={
                    userSpells[spell.id] ? (<></>) : (
                    <Button onClick={() => add(spell)} type="secondary">Apprendre +</Button>
                  )}
                  roll={() => {}}
                />
              ))
          }
        </Card>
    )
  );
}