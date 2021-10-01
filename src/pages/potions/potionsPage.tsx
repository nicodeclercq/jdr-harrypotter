import React from 'react';
import { pipe } from 'fp-ts/function';

import { Layout } from '../../components/Layout';
import { MyPotions } from './MyPotions';
import { PotionsLibrary } from './PotionsLibrary';
import { Ingredients } from './Ingredients';
import { fromRemoteData, sequence } from '../../helpers/remoteData';
import { usePotions } from './usePotions';
import { Info } from '../../components/Info';

export function PotionsPage() {
  const { getOwnedIngredients, getCookedPotions, getOwnedBottles } = usePotions();

  return pipe(
    sequence({
      ownedIngredients: getOwnedIngredients(),
      cookedPotions: getCookedPotions(),
      emptyBottles: getOwnedBottles(),
    }),
    fromRemoteData(
      ({ownedIngredients, cookedPotions, emptyBottles}) => (
      <Layout>
        <div className="w-1/2 h-full m-3 space-y-2">
          <Info icon="POTION">
            La création de potion est un art très puissant, malheureusement il demamde au sorcier qui désire l'utiliser beaucoup d'anticipation.
            Pour créer une potion le sorcier doit rester au calme pendant 1 heure. Il a besoin d'un certain nombre d'ingrédients et d'une fiole pour contenir la potion.
            Les potions ne peuvent rester longtemps dans un chaudron car celle-ci sont corrosives et abimerais leur contenant rendant ainsi les effets de la potion aléatoires.
            De la même façon les fioles utilisées pour contenir une potion ne sont pas toujours récupérables après utilisation.
          </Info>
          <PotionsLibrary ownedIngredients={ownedIngredients} emptyBottles={emptyBottles} />
        </div>
        <div className="w-1/2 h-full m-3 space-y-4">
          <Ingredients ownedBottles={emptyBottles} ownedIngredients={ownedIngredients} />
          <MyPotions emptyBottles={emptyBottles} cookedPotions={cookedPotions} ownedIngredients={ownedIngredients} />
        </div>
      </Layout>
    ))
  )
}