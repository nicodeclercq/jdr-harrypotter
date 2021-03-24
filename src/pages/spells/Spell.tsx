import React from 'react';
import { pipe } from 'fp-ts/lib/function';
import { BodyText } from '../../components/font/BodyText';
import { Incantation } from '../../components/font/Incantation';
import { Tag, Color } from '../../components/Tag';
import { Accordion } from '../../components/Accordion';
import { entries } from '../../helpers/object';
import * as SpellType from './domain/Spell';
import { ElementTag } from '../../components/ElementTag';
import { Button } from '../../components/Button';
import { useSpell } from './useSpell';

const elements: Record<SpellType.Target, string> = {
  'Animal': '🐇',
  'Object': '📦',
  'Plant': '🍁',
  'Person': '🧙',
};

const colors: Record<SpellType.Target, Color> = {
  'Animal': 'red',
  'Object': 'indigo',
  'Plant': 'green',
  'Person': 'pink',
};

export function Spell({spell, actions, isOwned = false}: { spell: SpellType.Spell, isOwned?: boolean, actions?: React.ReactNode}) {
  const { use } = useSpell();

  const costs = pipe(
    SpellType.getSpellCost(spell),
    ({primary, secondary}) => {
      if(spell.primaryElement === spell.secondaryElement) {
        return {[spell.primaryElement]: primary + secondary};
      }
      return {[spell.primaryElement]: primary, [spell.secondaryElement]: secondary};
    },
    (c) => entries(c).map(([name, cost]) => <ElementTag key={name} title={`${cost} Éléments ${name}`} points={cost} element={name as SpellType.Element} />),
  );

  return (
    <Accordion>
      {{
        header: (
          <div className="flex">
            <div className="flex-grow text-left space-x-2">
              <Tag color="white" title={`Niveau ${spell.level}`}>{spell.level}</Tag>
              <Incantation>{spell.incantation}</Incantation>
              <BodyText>{spell.name}</BodyText>
            </div>
            {!isOwned && (<div className="text-right space-x-1">{costs}</div>)}
          </div>
        ),
        content: (
          <div className="flex flex-col space-y-2">
            <hr className="border-y"/>
            <BodyText>{spell.description}</BodyText>
            <div className="space-x-2">
              {spell.targets.Animal && <Tag title={'Cible Animale'} color={colors.Animal}>{elements.Animal}</Tag>}
              {spell.targets.Plant && <Tag title={'Cible Végétale'} color={colors.Plant}>{elements.Plant}</Tag>}
              {spell.targets.Person && <Tag title={'Cible Personne'} color={colors.Person}>{elements.Person}</Tag>}
              {spell.targets.Object && <Tag title={'Cible Objet'} color={colors.Object}>{elements.Object}</Tag>}
            </div>
            {actions && <div className="m-2 flex space-x-2 flex-row-reverse">{actions}</div>}
          </div>
        ),
        actions: isOwned
            && (<div className="space-x-2">
                <Button onClick={() => use(spell, true)} type="secondary">Critique</Button>
                <Button onClick={() => use(spell, false)} type="primary">Réussite</Button>
                </div>
              )
      }}
    </Accordion>
  )
}