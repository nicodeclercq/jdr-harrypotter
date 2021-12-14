import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Title } from '../../components/font/Title';
import { Icon } from '../../components/icons/Icon';
import { getNRandomFromArray } from '../../helpers/array';
import { usePersistantState } from '../../hooks/usePersistantState';
import { Spell } from '../spells/Spell';
import { spells } from '../spells/spells';
import * as SpellType from '../spells/domain/Spell';
import { RollModal } from '../../components/RollModal';

const levelNoneSpells = spells.filter(({level}) => level == undefined);
const level0Spells = spells.filter(({level}) => level === 0);
const level1Spells = spells.filter(({level}) => level === 1);
const level2Spells = spells.filter(({level}) => level === 2);
const level3Spells = spells.filter(({level}) => level === 3);
const level4Spells = spells.filter(({level}) => level === 4);

  const getRandomSpells = () => ({
    null: getNRandomFromArray(2, levelNoneSpells),
    0: getNRandomFromArray(2, level0Spells),
    1: getNRandomFromArray(2, level1Spells),
    2: getNRandomFromArray(2, level2Spells),
    3: getNRandomFromArray(2, level3Spells),
    4: getNRandomFromArray(2, level4Spells),
  });

export function RandomSpells(){
  const [rollModalSpell, setRollModalSpell] = useState<SpellType.Spell | undefined>(undefined);
  const [selectedSpells, setSelectedSpells] = usePersistantState('RANDOM_SPELLS', getRandomSpells());
  
  return (<>
    <Card title={
      <div className="flex justify-between">
        <Title>Sorts Aléatoires</Title>
        <Button type="secondary" onClick={() => setSelectedSpells(getRandomSpells())} title="reset">
          <Icon name="DICE" />
        </Button>
      </div>
     } useDividers>
      {
        Object.entries(selectedSpells)
          .map(([level, list]) => (
            <div key={level}>
              {
                list.map((spell) => <Spell spell={spell} isOwned roll={() => {setRollModalSpell(spell)}} />)
              }
            </div>
          ))
      }
    </Card>
    {
        rollModalSpell != null && <RollModal
          successPercentage={50}
          title={`${rollModalSpell.incantation} ${rollModalSpell.name}`}
          onRollEnd={() => {setRollModalSpell(undefined)}}
        />
      }
  </>)

}