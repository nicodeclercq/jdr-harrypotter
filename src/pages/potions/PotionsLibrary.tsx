import React from 'react';
import { Card } from '../../components/Card';
import { potions } from './potions';
import { Potion } from './Potion';

type Props = {
  emptyBottles: number;
  ownedIngredients: {id: string, number: number}[];
}

export function PotionsLibrary({ownedIngredients, emptyBottles}: Props) {
  return (<Card title="Liste des potions" useDividers fullWidth>
    {
      potions.map(potion => <Potion key={potion.id} potion={potion} emptyBottles={emptyBottles} ownedIngredients={ownedIngredients} />)
    }
  </Card>);
}