import * as RemoteData from '@devexperts/remote-data-ts';

import { useStore } from './../../useStore';
import { Spell } from './domain/Spell';
import * as Objects from '../../helpers/object';
import * as Interaction from '../../helpers/interaction';
import { pipe } from 'fp-ts/lib/function';


export const useSpell = () => {
  const { getState, setState } = useStore();

  const add = (spell: Spell) => {
    pipe(
      getState(),
      RemoteData.map(
        state => ({
          ...state,
          userSpells: {...state.userSpells, [spell.id]: {
            id: spell.id,
            currentLevel: state.traits.Pouvoir * 2,
            uses: 0,
            userPoints: {
              Air: 0,
              Corps: 0,
              Eau: 0,
              Feu: 0,
              Terre: 0,
              Âme: 0,
            },
          }},
        })
      ),
      setState,
    );
  }

  const remove = (spell: Spell) => {
    pipe(
      getState(),
      RemoteData.map(state => {
        const userSpells = Objects.remove(`${spell.id}`, state.userSpells);
        return {
          ...state,
          userSpells,
        };
      }),
      setState,
    );
  }

  const use = (spell: Spell, isCritical: boolean) => {
    pipe(
      getState(),
      RemoteData.map(state => {
        const userPoints = state.userSpells[spell.id].userPoints;

        if (state.userSpells[spell.id].currentLevel < state.traits.Pouvoir * 5) {
          userPoints[spell.primaryElement] = userPoints[spell.primaryElement] + 2 * (isCritical ? 2 : 1);
          userPoints[spell.secondaryElement] = userPoints[spell.secondaryElement] + 1 * (isCritical ? 2 : 1);
        }

        return {
          ...state,
          userSpells: {
            ...state.userSpells,
            [spell.id]: {
              ...state.userSpells[spell.id],
              userPoints:{
                ...userPoints
              },
              uses: state.userSpells[spell.id].uses + 1,
            },
          },
        };
      }),
      setState,
    );
  }

  const upgrade = (spell: Spell, result: Interaction.Interaction<never, number>) => {
    pipe(
      getState(),
      RemoteData.map(state => {
        const currentLevel = state.userSpells[spell.id].currentLevel;
        const nextLevel = pipe(
          result,
          Interaction.fold({
            success: (points) => state.userSpells[spell.id].currentLevel + points < state.traits.Pouvoir * 5
              ? currentLevel + points
              : state.traits.Pouvoir * 5,
            failure: () => state.userSpells[spell.id].currentLevel,
            canceled: () => state.userSpells[spell.id].currentLevel,
          })
        );

        return {
          ...state,
          userSpells: {
            ...state.userSpells,
            [spell.id]: {
              ...state.userSpells[spell.id],
              uses: Interaction.isCanceled(result) ? state.userSpells[spell.id] : 0,
              currentLevel: nextLevel,
            },
          },
        };
      }),
      setState,
    );
  }

  const getUserSpells = () => {
    return pipe(
      getState(),
      RemoteData.map(state => state.userSpells),
    );
  }

  return {
    add,
    remove,
    getUserSpells,
    use,
    upgrade,
  }
}