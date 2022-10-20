import { sequence } from './../../helpers/remoteData';
import { useTraits } from './../home/useTraits';
import * as RemoteData from '@devexperts/remote-data-ts';
import { pipe } from 'fp-ts/function';

import { State } from '../../store/State';
import { useStore } from '../../hooks/useStore';
import { Spell } from './domain/Spell';
import * as Objects from '../../helpers/object';
import * as Interaction from '../../helpers/interaction';
import { onSuccess } from '../../helpers/remoteData';

const userSpellsLens = Objects.lens<State, 'userSpells'>('userSpells');

export const useSpell = () => {
  const [userSpells, setUserSpells] = useStore(userSpellsLens);
  const {traits} = useTraits();

  const add = (spell: Spell) => {
    pipe(
      sequence({userSpells, traits}),
      RemoteData.map(
        ({userSpells, traits}) => ({
          ...userSpells,
          knownSpells:{
            ...userSpells.knownSpells,
            [spell.name]: {
              currentLevel: traits.Pouvoir * 2,
              uses: 0,
            }
          },
          points: {
            ...userSpells.points,
            [spell.category]: 0,
          }
        })
      ),
      onSuccess(setUserSpells),
    );
  }

  const remove = (spell: Spell) => {
    pipe(
      userSpells,
      RemoteData.map(userSpells => ({
        ...userSpells,
        knownSpells: Objects.remove(spell.name, userSpells.knownSpells),
      })),
      onSuccess(setUserSpells),
    );
  }

  const use = (spell: Spell, isCritical: boolean) => {
    pipe(
      sequence({userSpells, traits}),
      RemoteData.map(({userSpells, traits}) => {
        const factor = isCritical ? 2 : 1;
        return {
          ...userSpells,
          knownSpells: {
            ...userSpells.knownSpells,
            [spell.name]: {
              currentLevel: userSpells.knownSpells[spell.name].currentLevel,
              uses: userSpells.knownSpells[spell.name].uses + 1,
            }
          },
          points: {
            ...userSpells.points,
            [spell.category]: (userSpells.points[spell.category] ?? 0) + factor * ((spell.level ?? 0)+2)
          }
        };
      }),
      onSuccess(setUserSpells),
    );
  }

  const upgrade = (spell: Spell, result: Interaction.Interaction<never, number>) => {
    pipe(
      sequence({userSpells, traits}),
      RemoteData.map(({userSpells, traits}) => {
        const currentLevel = userSpells.knownSpells[spell.name].currentLevel;
        const nextLevel = pipe(
          result,
          Interaction.fold({
            success: (points) => currentLevel + points < traits.Pouvoir * 5
              ? {
                  currentLevel: currentLevel + points,
                  uses: 0,
                }
              : {
                  currentLevel: traits.Pouvoir * 5,
                  uses: 0,
                },
            failure: () => ({
              currentLevel,
              uses: 0,
            }),
            canceled: () => userSpells.knownSpells[spell.name],
          })
        );

        return {
          ...userSpells,
          knownSpells: {
            ...userSpells.knownSpells,
            [spell.name]: nextLevel
          },
        };
      }),
      onSuccess(setUserSpells),
    );
  }

  const canBeAdded = (spell: Spell, userSpells: State['userSpells']) => {
    return  spell.category !== 'sort de base' &&
      userSpells.knownSpells[spell.name] == null &&
      (userSpells.points[spell.category] ?? 0) >= 2 * ((spell.level ?? 1) + 1)**((spell.level ?? 1 + 1)) + 1;
  }

  return {
    userSpells,
    add,
    remove,
    use,
    upgrade,
    canBeAdded,
  }
}