import React from 'react';
import { pipe } from 'fp-ts/function';

import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Spell } from './Spell';
import { spells } from './spells';
import { useSpell } from './useSpell';
import { fromRemoteData } from '../../helpers/remoteData';

export function SpellsLibrary() {
  const { add, userSpells } = useSpell();

  return pipe(
    userSpells,
    fromRemoteData(userSpells => (
      <Card useDividers title="Liste des Sortilèges">
        {
          spells
            .map((spell) => (
              <Spell
                key={spell.name}
                spell={spell}
                actions={
                  userSpells.knownSpells[spell.name] ? (<></>) : (
                  <Button onClick={() => add(spell)} type="secondary">Apprendre +</Button>
                )}
              />
            ))
        }
      </Card>
    ))
  );
}