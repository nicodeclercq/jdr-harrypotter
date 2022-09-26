import React, { useState } from 'react';
import { pipe } from 'fp-ts/lib/function';

import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { EmptyContent } from '../../components/EmptyContent';
import { useNotification } from '../../components/Notification';
import { RollModal } from '../../components/RollModal';
import { UpgradeRollModal } from '../../components/UpgradeRollModal';
import { noop } from '../../helpers/function';
import * as Interaction from '../../helpers/interaction';
import { fromRemoteData } from '../../helpers/remoteData';
import * as SpellType from './domain/Spell';
import { getNextLevelSpells, UserSpells as UserSpellsType } from './domain/UserSpell';
import { Spell } from './Spell';
import { spells } from './spells';
import { useSpell } from './useSpell';
import { entries } from '../../helpers/object';
import { isDefined } from '../../helpers/nullable';

type Props = {
  goTo?: () => void;
}

function UserSpells({userSpells, goTo}: {userSpells: UserSpellsType} & Props){
  const [rollModalSpell, setRollModalSpell] = useState<SpellType.Spell | undefined>(undefined);
  const [nextLevelSpell, setNextLevelSpell] = useState<SpellType.Spell | undefined>(undefined);
  const { use, remove, upgrade } = useSpell();
  const { add } = useNotification();
  const knownSpells = entries(userSpells.knownSpells)
    .filter(isDefined)
    .map(([name, value]) => ({
      name,
      status: value,
      spell: spells.find(spell => spell.name === name),
    }));

  const onRollEnd = (spell: SpellType.Spell) => (result: Interaction.Interaction<never, number>) => {
    pipe(
      result,
      Interaction.fold({
        success: (value: number) => use(spell, value <= 5),
        failure: () => use(spell, false),
        canceled: noop,
      }),
      () => setRollModalSpell(undefined),
      () => getNextLevelSpells(userSpells),
      nextLevelSpells => {
        if(nextLevelSpells.length) {
          nextLevelSpells.forEach(nextLevelSpell =>
            add({
              id: `spellUpdate_${nextLevelSpell.name}`,
              type: 'success',
              message: `“${nextLevelSpell.spell?.incantation ?? nextLevelSpell.name}” peut être amélioré`,
              action:{
                run: () => {
                  setNextLevelSpell(nextLevelSpell.spell);
                },
                label: 'Améliorer',
              },
            })
          );
        }
      }
    );
  }

  const onUpgradeEnd = (spell: SpellType.Spell) => (result: Interaction.Interaction<never, number>) => {
    upgrade(spell, result);
    setNextLevelSpell(undefined);
  }

  return (
    <>
      <Card useDividers title={(
        <div className="flex space-x-2">
          <span className="flex-grow">Mes Sortilèges</span>
        </div>)}>
        {
          knownSpells.length
            ? knownSpells.map(({spell}) => (
                <Spell
                  key={`${spell?.name}_${spell?.level}`}
                  spell={spell as SpellType.Spell}
                  actions={(
                    <Button onClick={() => remove(spell as SpellType.Spell)} type="secondary">Supprimer -</Button>
                  )}
                  roll={() => setRollModalSpell(spell)}
                  isOwned
                  currentLevel={userSpells.knownSpells[spell?.name ?? '']?.currentLevel}
                />
              ))
            : (<EmptyContent goTo={goTo}>
                {{
                  emoji: 'BOOK',
                  title: 'Tu ne connais encore rien ?',
                  description: 'Il va falloir te mettre au travail vite fait mon petit gars!'
                }}
              </EmptyContent>)
        }
      </Card>
      {
        rollModalSpell != null && <RollModal
          successPercentage={userSpells.knownSpells[rollModalSpell.name].currentLevel}
          title={`${rollModalSpell.incantation} ${rollModalSpell.name}`}
          onRollEnd={onRollEnd(rollModalSpell)}
        />
      }
      {
        nextLevelSpell != null && <UpgradeRollModal
          successPercentage={userSpells.knownSpells[nextLevelSpell.name].currentLevel}
          title={nextLevelSpell.name}
          onRollEnd={onUpgradeEnd(nextLevelSpell)}
        />
      }
    </>
  );
}

export function MySpells({goTo}: Props) {
  const { userSpells } = useSpell();

  return pipe(
    userSpells,
    fromRemoteData((userSpells) => <UserSpells goTo={goTo} userSpells={userSpells} />)
  );
}