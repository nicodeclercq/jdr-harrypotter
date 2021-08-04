import * as RemoteData from '@devexperts/remote-data-ts';
import { pipe } from 'fp-ts/function';

import { potions } from './potions';
import { useStore } from '../../store/useStore';
import { State } from '../../store/State';
import { useDistinct } from '../../hooks/useDistinct';
import { equals } from '../../helpers/remoteData';

export const usePotions = () => {
  const { getState, setState } = useStore();
  const distinctCookedPotions = useDistinct(equals);
  const distinctIngredients = useDistinct(equals);
  const distinctBottles = useDistinct(equals);

  const getCookedPotions = () => pipe(
    getState(),
    RemoteData.map(state => state.potions.cookedPotions),
    distinctCookedPotions,
  );

  const getOwnedIngredients = () => pipe(
    getState(),
    RemoteData.map(state => state.potions.ingredients),
    distinctIngredients,
  );

  const setOwnedIngredientsAndBottles = (ingredients: State['potions']['ingredients'], emptyBottles: State['potions']['emptyBottles']) => pipe(
    getState(),
    RemoteData.map(state => ({
      ...state,
      potions: {
        ...state.potions,
        ingredients,
        emptyBottles,
      },
    })),
    setState,
  );

  const getOwnedBottles = () => pipe(
    getState(),
    RemoteData.map(state => state.potions.emptyBottles),
    distinctBottles,
  );

  const cookPotion = (potionName: string) => {
    return pipe(
      getState(),
      RemoteData.map(state => {
        const potion = potions.find(potion => potion.name === potionName);
        const cookedPotions = state.potions.cookedPotions.find((cookedPotion) => cookedPotion.name === potionName)
          ? state.potions.cookedPotions.map((cookedPotion) => cookedPotion.name === potionName
              ? {name: cookedPotion.name, number: cookedPotion.number+1}
              : cookedPotion
          )
          : [...state.potions.cookedPotions, {name: potionName, number: 1}];

        const ingredients = state.potions.ingredients.map((ingredient) => {
          const containsIngredient = potion?.ingredients.find(i => i === ingredient.name) != null;

          return containsIngredient
          ? {
              number: ingredient.number - 1,
              name: ingredient.name
            }
          : ingredient;
        });

        return {...state,
          potions: {
            ...state.potions,
            cookedPotions,
            ingredients,
            emptyBottles: state.potions.emptyBottles > 0
              ? state.potions.emptyBottles - 1
              : 0
          }
        }
      }),
      setState,
    );
  }

  const usePotion = (potionName: string, reuseBottle: boolean) => {
    return pipe(
      getState(),
      RemoteData.map(state => ({...state,
        potions: {
          ...state.potions,
          cookedPotions: state.potions.cookedPotions
            .map((cookedPotion) => cookedPotion.name === potionName
              ? {name: cookedPotion.name, number: cookedPotion.number - 1}
              : cookedPotion,
            )
            .filter(({number}) => number > 0),
          emptyBottles: reuseBottle
            ? state.potions.emptyBottles + 1
            : state.potions.emptyBottles,
        }
      })),
      setState,
    );
  }

  return {
    getCookedPotions,
    cookPotion,
    usePotion,
    getOwnedIngredients,
    getOwnedBottles,
    setOwnedIngredientsAndBottles,
  }
}