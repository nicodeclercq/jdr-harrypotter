import React from 'react';
import { Layout } from '../../components/Layout';
import { MyPotions } from './MyPotions';
import { PotionsLibrary } from './PotionsLibrary';
import { Ingredients } from './Ingredients';
import { fromRemoteData, sequence } from '../../helpers/remoteData';
import { usePotions } from './usePotions';

export function PotionsPage() {
  const { getOwnedIngredients, getCookedPotions, getOwnedBottles } = usePotions();

  return fromRemoteData(
    sequence({
      ownedIngredients: getOwnedIngredients(),
      cookedPotions: getCookedPotions(),
      emptyBottles: getOwnedBottles(),
    }),
    ({ownedIngredients, cookedPotions, emptyBottles}) => (
    <Layout>
      <div className="w-1/2 h-full m-3">
        <PotionsLibrary ownedIngredients={ownedIngredients} emptyBottles={emptyBottles} />
      </div>
      <div className="w-1/2 h-full m-3 space-y-4">
        <Ingredients ownedBottles={emptyBottles} ownedIngredients={ownedIngredients} />
        <MyPotions emptyBottles={emptyBottles} cookedPotions={cookedPotions} ownedIngredients={ownedIngredients} />
      </div>
    </Layout>
  )
  )
}