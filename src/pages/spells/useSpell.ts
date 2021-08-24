import { sequence } from './../../helpers/remoteData';
import { useTraits } from './../home/useTraits';
import * as RemoteData from '@devexperts/remote-data-ts';
import { pipe } from 'fp-ts/function';

import { State, UserSpell } from '../../store/State';
import { useStore } from '../../hooks/useStore';
import { Spell, getSpellCost, Element } from './domain/Spell';
import * as Objects from '../../helpers/object';
import * as Interaction from '../../helpers/interaction';
import { onSuccess } from '../../helpers/remoteData';

const rawElementPoints = {
  Air: 0,
  Corps: 0,
  Eau: 0,
  Feu: 0,
  Terre: 0,
  Âme: 0,
} as const;

const hasSufficiantPoints = (cost: Record<Element, number>, state: State['userSpells']) => Objects
  .entries(cost)
  .filter(([element, value]) => value > 0 && hasRemainingPoints(state, element))
  .length > 0;

const hasRemainingPoints = (state: State['userSpells'], element: Element) => Objects
  .entries(state)
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

const removeSpellsPoints = (cost: Record<Element, number>, state: State['userSpells']): State['userSpells'] => {
  if(!hasRemainingCost(cost) || !hasSufficiantPoints(cost, state)) {
    return state;
  }
  const {newCost, userSpells} = Objects.entries(state)
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
    userSpells
  );
}

const userSpellsLens = Objects.lens<State, 'userSpells'>('userSpells');

export const useSpell = () => {
  const { getUserTraits } = useTraits();
  const [userSpells, setUserSpells] = useStore(userSpellsLens);

  const traits = getUserTraits();

  const add = (spell: Spell) => {
    const cost = getSpellCost(spell);

    pipe(
      sequence({userSpells, traits}),
      RemoteData.map(
        ({userSpells, traits}) => ({
          ...userSpells, [spell.id]: {
          id: spell.id,
          currentLevel: traits.Pouvoir * 2,
          uses: 0,
          userPoints: rawElementPoints,
        }})
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
      onSuccess(setUserSpells),
    );
  }

  const remove = (spell: Spell) => {
    pipe(
      userSpells,
      RemoteData.map(userSpells => Objects.remove(`${spell.id}`, userSpells)),
      onSuccess(setUserSpells),
    );
  }

  const use = (spell: Spell, isCritical: boolean) => {
    pipe(
      sequence({userSpells, traits}),
      RemoteData.map(({userSpells, traits}) => {
        const userPoints = userSpells[spell.id].userPoints;

        if (userSpells[spell.id].currentLevel < traits.Pouvoir * 5) {
          userPoints[spell.primaryElement] = userPoints[spell.primaryElement] + 2 * (isCritical ? 2 : 1);
          userPoints[spell.secondaryElement] = userPoints[spell.secondaryElement] + 1 * (isCritical ? 2 : 1);
        }

        return {
          ...userSpells,
          [spell.id]: {
            ...userSpells[spell.id],
            userPoints:{
              ...userPoints
            },
            uses: userSpells[spell.id].uses + 1,
          },
        };
      }),
      onSuccess(setUserSpells),
    );
  }

  const upgrade = (spell: Spell, result: Interaction.Interaction<never, number>) => {
    pipe(
      sequence({userSpells, traits}),
      RemoteData.map(({userSpells, traits}) => {
        const currentLevel = userSpells[spell.id].currentLevel;
        const nextLevel = pipe(
          result,
          Interaction.fold({
            success: (points) => userSpells[spell.id].currentLevel + points < traits.Pouvoir * 5
              ? currentLevel + points
              : traits.Pouvoir * 5,
            failure: () => userSpells[spell.id].currentLevel,
            canceled: () => userSpells[spell.id].currentLevel,
          })
        );

        return {
          ...userSpells,
          [spell.id]: {
            ...userSpells[spell.id],
            uses: Interaction.isCanceled(result) ? userSpells[spell.id] : 0,
            currentLevel: nextLevel,
          },
        };
      }),
      onSuccess(setUserSpells),
    );
  }

  const getUserSpells = () => userSpells;

  return {
    add,
    remove,
    getUserSpells,
    use,
    upgrade,
  }
}