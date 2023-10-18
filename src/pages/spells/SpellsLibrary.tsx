import React from "react";
import { pipe } from "fp-ts/function";

import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Spell } from "./Spell";
import { spells } from "./spells";
import { useSpell } from "./useSpell";
import { fromRemoteData } from "../../helpers/remoteData";

export function SpellsLibrary() {
  const { add, userSpells, canBeAdded } = useSpell();

  return pipe(
    userSpells,
    fromRemoteData(userSpells => (
      <Card useDividers title="Liste des Sortilèges">
        {
          spells
            .filter(({name}) => !(name in userSpells.knownSpells))
            .map((spell) => (
              <Spell
                key={`${spell.name}_${spell.level}`}
                spell={spell}
                canBeAdded={canBeAdded(spell, userSpells)}
                actions={
                  userSpells.knownSpells[spell.name]
                    ? (<></>)
                    : (<Button onClick={() => add(spell)} type="secondary">Apprendre +</Button>)
                }
              />
            ))
        }
      </Card>
    ))
  );
}