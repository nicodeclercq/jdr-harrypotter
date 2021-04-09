import { pipe } from 'fp-ts/lib/function';
import React, { useEffect, useState } from 'react';
import * as RemoteData from '@devexperts/remote-data-ts';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { ElementTag } from '../../components/ElementTag';
import { EmptyContent } from '../../components/EmptyContent';
import { Incantation } from '../../components/font/Incantation';
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

function UserSpells({userSpells}: {userSpells: UserSpellsType}){
  const [rollModalSpellId, setRollModalSpellId] = useState<number | undefined>(undefined);
  const [nextLevelSpell, setNextLevelSpell] = useState<number | undefined>(undefined);
  const { use, remove, upgrade } = useSpell();
  const { add } = useNotification();
  const values = Object.values(userSpells);
      
  useEffect(() => {
    const nextLevelSpells = getNextLevelSpells(userSpells);

    if(nextLevelSpells.length) {
      add({
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
  }, [userSpells, add]);

  const onRollEnd = (spell: SpellType.Spell) => (result: Interaction.Interaction<never, number>) => {
    pipe(
      result,
      Interaction.fold({
        success: (value: number) => use(spell, value <= 5),
        failure: () => use(spell, false),
        canceled: noop,
      }),
      () => setRollModalSpellId(undefined),
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
            : (<EmptyContent>
                {{
                  emoji: '📖',
                  title: 'Tu ne connais encore rien ?',
                  description: 'Il va falloir te mettre au travail vite fait mon petit gars!'
                }}
              </EmptyContent>)
        }
      </Card>
      {
        rollModalSpellId != null && <RollModal
          successPercentage={userSpells[rollModalSpellId].currentLevel}
          title={
            <span className="space-x-2">
              <Incantation>{spells[rollModalSpellId].incantation}</Incantation>
              <span>{spells[rollModalSpellId].name}</span>
            </span>
          }
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
export function MySpells() {
  const { getUserSpells } = useSpell();

  const userSpells = getUserSpells();

  return fromRemoteData(
    userSpells,
    (userSpells) => <UserSpells userSpells={userSpells} />);
}