import * as RemoteData from "@devexperts/remote-data-ts";
import { pipe } from "fp-ts/function";

import { potions } from "./potions";
import { useStore } from "../../hooks/useStore";
import { State } from "../../store/State";
import { onSuccess } from "../../helpers/remoteData";
import { lens } from "../../helpers/object";

const potionList = potions;

const potionsLens = lens<State, "potions">("potions");

export const usePotions = () => {
  const [potions, setPotions] = useStore(potionsLens);

  const getCookedPotions = () => pipe(
    potions,
    RemoteData.map(potions => potions.cookedPotions),
  );

  const getOwnedIngredients = () => pipe(
    potions,
    RemoteData.map(potions => potions.ingredients),
  );

  const setOwnedIngredientsAndBottles = (ingredients: State["potions"]["ingredients"], emptyBottles: State["potions"]["emptyBottles"]) => pipe(
    potions,
    onSuccess((potions) => setPotions({
      ...potions,
      ingredients,
      emptyBottles,
    }))
  );

  const getOwnedBottles = () => pipe(
    potions,
    RemoteData.map(potions => potions.emptyBottles),
  );

  const cookPotion = (potionName: string) => {
    return pipe(
      potions,
      RemoteData.map(potions => {
        const potion = potionList.find(potion => potion.name === potionName);
        const cookedPotions = potions.cookedPotions.find((cookedPotion) => cookedPotion.name === potionName)
          ? potions.cookedPotions.map((cookedPotion) => cookedPotion.name === potionName
            ? {name: cookedPotion.name, number: cookedPotion.number+1}
            : cookedPotion
          )
          : [...potions.cookedPotions, {name: potionName, number: 1}];

        const ingredients = potions.ingredients.map((ingredient) => {
          const containsIngredient = potion?.ingredients.find(i => i === ingredient.name) != null;

          return containsIngredient
            ? {
              number: ingredient.number - 1,
              name: ingredient.name
            }
            : ingredient;
        });

        return {
          ...potions,
          cookedPotions,
          ingredients,
          emptyBottles: potions.emptyBottles > 0
            ? potions.emptyBottles - 1
            : 0
        };
      }),
      onSuccess(setPotions),
    );
  };

  const usePotion = (potionName: string, reuseBottle: boolean) => {
    return pipe(
      potions,
      RemoteData.map(potions => ({
        ...potions,
        cookedPotions: potions.cookedPotions
          .map((cookedPotion) => cookedPotion.name === potionName
            ? {name: cookedPotion.name, number: cookedPotion.number - 1}
            : cookedPotion,
          )
          .filter(({number}) => number > 0),
        emptyBottles: reuseBottle
          ? potions.emptyBottles + 1
          : potions.emptyBottles,
      }
      )),
      onSuccess(setPotions),
    );
  };

  return {
    getCookedPotions,
    cookPotion,
    usePotion,
    getOwnedIngredients,
    getOwnedBottles,
    setOwnedIngredientsAndBottles,
  };
};