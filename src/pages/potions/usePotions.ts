import * as RemoteData from '@devexperts/remote-data-ts';
import { pipe } from 'fp-ts/lib/function';

import { useStore } from '../../store/useStore';
import { State } from '../../store/State';

export const usePotions = () => {
  const { getState, setState } = useStore();

  const getCookedPotions = () => pipe(
    getState(),
    RemoteData.map(state => state.potions.cookedPotions),
  );

  const getOwnedIngredients = () => pipe(
    getState(),
    RemoteData.map(state => state.potions.ingredients),
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
  );

  const cookPotion = (potionId: string) => {
    return pipe(
      getState(),
      RemoteData.map(state => {
        const cookedPotions = state.potions.cookedPotions.find((cookedPotion) => cookedPotion.id === potionId)
          ? state.potions.cookedPotions.map((cookedPotion) => cookedPotion.id === potionId
              ? {id: cookedPotion.id, number: cookedPotion.number+1}
              : cookedPotion
          )
          : [...state.potions.cookedPotions, {id: potionId, number: 1}];

        return {...state,
          potions: {
            ...state.potions,
            cookedPotions,
            emptyBottles: state.potions.emptyBottles > 0
              ? state.potions.emptyBottles - 1
              : 0
          }
        }
      }),
      setState,
    );
  }

  const usePotion = (potionId: string, reuseBottle: boolean) => {
    return pipe(
      getState(),
      RemoteData.map(state => ({...state,
        potions: {
          ...state.potions,
          cookedPotions: state.potions.cookedPotions
            .map((cookedPotion) => cookedPotion.id === potionId
              ? {id: cookedPotion.id, number: cookedPotion.number - 1}
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