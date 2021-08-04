import * as RemoteData from '@devexperts/remote-data-ts';
import { pipe } from 'fp-ts/function';

import { State, UserSpell } from '../../store/State';
import { useStore } from '../../store/useStore';
import { Spell, getSpellCost, Element } from './domain/Spell';
import * as Objects from '../../helpers/object';
import * as Interaction from '../../helpers/interaction';
import { useDistinct } from '../../hooks/useDistinct';
import { equals } from '../../helpers/remoteData';

const rawElementPoints = {
  Air: 0,
  Corps: 0,
  Eau: 0,
  Feu: 0,
  Terre: 0,
  Âme: 0,
} as const;


const hasSufficiantPoints = (cost: Record<Element, number>, state: State) => Objects
  .entries(cost)
  .filter(([element, value]) => value > 0 && hasRemainingPoints(state, element))
  .length > 0;
const hasRemainingPoints = (state: State, element: Element) => Objects
  .entries(state.userSpells)
  .filter(([,userSpell]) => userSpell.userPoints[element] > 0)
  .length > 0;

const hasRemainingCost = (cost: Record<Element, number>) => Objects
  .entries(cost)
  .filter(([,c]) => c > 0)
  .length > 0;

const removeSpellPoints = (cost: Record<Element, number>, userSpell: UserSpell): {cost: Record<Element, number>, userSpell: UserSpell} => {
  if(!hasRemainingCost(cost)){
    return {cost, userSpell};
  }

  const {newCost, newPoints} = Object.entries(userSpell.userPoints)
    .reduce(
      ({newCost, newPoints}, [element, points]) => {
        const diff = points > cost[element as Element]
          ? cost[element as Element]
          : points;
        return {
          newCost: {
            ...newCost,
            [element as Element]: cost[element as Element] - diff,
          },
          newPoints: {
            ...newPoints,
            [element as Element]: points - diff,
          }
        }
      },
      {newCost: cost, newPoints: rawElementPoints}, 
    );

  return {
    cost: newCost,
    userSpell: {
      ...userSpell,
      userPoints: newPoints
    }
  };
};

const removeSpellsPoints = (cost: Record<Element, number>, state: State): State => {
  if(!hasRemainingCost(cost) || !hasSufficiantPoints(cost, state)) {
    return state;
  }
  const {newCost, userSpells} = Objects.entries(state.userSpells)
    .reduce(({newCost: cost, userSpells}, [,userSpell]) => {
      const { cost: newCost, userSpell: newUserSpell } = removeSpellPoints(cost, userSpell);

      return {
        newCost,
        userSpells: {
          ...userSpells,
          [newUserSpell.id] : newUserSpell,
        }
      }
  }, {newCost: cost, userSpells: {} as Record<string, UserSpell>});

  return removeSpellsPoints(
    newCost,
    {
      ...state,
      userSpells
    });
}

export const useSpell = () => {
  const { getState, setState } = useStore();
  const distinct = useDistinct(equals);

  const add = (spell: Spell) => {
    const cost = getSpellCost(spell);

    pipe(
      getState(),
      RemoteData.map(
        state => ({
          ...state,
          userSpells: {...state.userSpells, [spell.id]: {
            id: spell.id,
            currentLevel: state.traits.Pouvoir * 2,
            uses: 0,
            userPoints: rawElementPoints,
          }},
        })
      ),
      RemoteData.map(
        state => {
          const { userSpells } = removeSpellsPoints({
            ...rawElementPoints,
            [spell.primaryElement]: cost.primary,
            [spell.secondaryElement]: cost.secondary,
          }, state);

          return {
            ...state,
            userSpells
          };
        }
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
      distinct,
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