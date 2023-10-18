import React from "react";
import { pipe } from "fp-ts/function";

import { Layout } from "../../components/Layout";
import { MyPotions } from "./MyPotions";
import { PotionsLibrary } from "./PotionsLibrary";
import { Ingredients } from "./Ingredients";
import { fromRemoteData, sequence } from "../../helpers/remoteData";
import { usePotions } from "./usePotions";
import { Info } from "../../components/Info";

export function PotionsPage() {
  const { getOwnedIngredients, getCookedPotions, getOwnedBottles } =
    usePotions();

  return pipe(
    sequence({
      ownedIngredients: getOwnedIngredients(),
      cookedPotions: getCookedPotions(),
      emptyBottles: getOwnedBottles(),
    }),
    fromRemoteData(({ ownedIngredients, cookedPotions, emptyBottles }) => (
      <Layout>
        <div className="w-full h-full gap-4 grid grid-cols-1 md:grid-cols-2">
          <div className="order-2 space-y-2 md:order-1">
            <Info icon="POTION">
              La création de potion est un art très puissant, malheureusement il
              demamde au sorcier qui désire l&apos;utiliser beaucoup
              d&apos;anticipation. C&apos;est pour cela que seuls les sorciers
              prévoyants excellent en cet art. Pour créer une potion le sorcier
              doit rester au calme pendant 1 heure. Il a besoin d&apos;un
              certain nombre d&apos;ingrédients et d&apos;une fiole pour
              contenir la potion. Les potions ne peuvent rester longtemps dans
              un chaudron car celle-ci sont corrosives et abimerais leur
              contenant rendant ainsi les effets de la potion aléatoires. De la
              même façon les fioles utilisées pour contenir une potion ne sont
              pas toujours récupérables après utilisation.
            </Info>
            <PotionsLibrary
              ownedIngredients={ownedIngredients}
              emptyBottles={emptyBottles}
            />
          </div>
          <div className="order-1 space-y-4 md:order-2">
            <Ingredients
              ownedBottles={emptyBottles}
              ownedIngredients={ownedIngredients}
            />
            <MyPotions
              emptyBottles={emptyBottles}
              cookedPotions={cookedPotions}
              ownedIngredients={ownedIngredients}
            />
          </div>
        </div>
      </Layout>
    ))
  );
}
