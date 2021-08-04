import { pipe } from 'fp-ts/lib/function';
import React, { useState } from 'react';
import * as RemoteData from '@devexperts/remote-data-ts';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { ElementTag } from '../../components/ElementTag';
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

type Props = {
  goTo?: () => void;
}

function ElementsCount({userSpells}: {userSpells: {id: number; userPoints: Record<SpellType.Element, number>;}[]}){
  const result = SpellType.getTotalPoints(userSpells);

  return (
    <div className="space-x-2">
    {
      entries(result)
        .filter(([, value]) => value !==0)
        .map(([name, value]) => <ElementTag key={name} points={value} title={`${value} points ${name}`} element={name as SpellType.Element} />)
    }</div>
  );
}

function UserSpells({userSpells, goTo}: {userSpells: UserSpellsType} & Props){
  const [rollModalSpellId, setRollModalSpellId] = useState<number | undefined>(undefined);
  const [nextLevelSpell, setNextLevelSpell] = useState<number | undefined>(undefined);
  const { use, remove, upgrade } = useSpell();
  const { add } = useNotification();
  const values = Object.values(userSpells);

  const onRollEnd = (spell: SpellType.Spell) => (result: Interaction.Interaction<never, number>) => {
    pipe(
      result,
      Interaction.fold({
        success: (value: number) => use(spell, value <= 5),
        failure: () => use(spell, false),
        canceled: noop,
      }),
      () => setRollModalSpellId(undefined),
      () => getNextLevelSpells(userSpells),
      nextLevelSpells => {
        if(nextLevelSpells.length) {
          add({
            id: `spellUpdate_${nextLevelSpells[0].id}`,
            type: 'success',
            message: `${nextLevelSpells.length} sort peut être amélioré`,
            action:{
              run: () => {
                setNextLevelSpell(nextLevelSpells[0].id);
              },
              label: 'Choisir',
            },
            showUntil: (remoteState) =>
              pipe(
                remoteState,
                RemoteData.fold(
                  () => false,
                  () => false,
                  () => false,
                  (state) => state.userSpells[nextLevelSpells[0].id].currentLevel === nextLevelSpells[0].currentLevel
                )
              ),
          });
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
          <ElementsCount userSpells={values} />
        </div>)}>
        {
          values.length
            ? values.map((userSpell) => {
                const spell = spells[userSpell.id];
                return (
                  <Spell
                    key={spell.id}
                    spell={spell}
                    actions={(
                      <Button onClick={() => remove(spell)} type="secondary">Supprimer -</Button>
                    )}
                    roll={setRollModalSpellId}
                    isOwned
                  />
                )
              })
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
        rollModalSpellId != null && <RollModal
          successPercentage={userSpells[rollModalSpellId].currentLevel}
          title={`${spells[rollModalSpellId].incantation} ${spells[rollModalSpellId].name}`}
          onRollEnd={onRollEnd(spells[rollModalSpellId])}
        />
      }
      {
        nextLevelSpell != null && <UpgradeRollModal
          successPercentage={userSpells[nextLevelSpell].currentLevel}
          title={spells[userSpells[nextLevelSpell].id].name}
          onRollEnd={onUpgradeEnd(spells[userSpells[nextLevelSpell].id])}
        />
      }
    </>
  );
}

export function MySpells({goTo}: Props) {
  const { getUserSpells } = useSpell();

  const userSpells = getUserSpells();

  return pipe(
    userSpells,
    fromRemoteData((userSpells) => <UserSpells goTo={goTo} userSpells={userSpells} />)
  );
}