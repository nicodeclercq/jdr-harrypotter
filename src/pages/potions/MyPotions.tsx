import React from "react";
import { Card } from "../../components/Card";
import { EmptyContent } from "../../components/EmptyContent";
import { Potion } from "./Potion";
import { potions } from "./potions";
import { isDefined } from "../../helpers/nullable";

type Props = {
  emptyBottles: number;
  cookedPotions: {name: string; number: number}[];
  ownedIngredients: {name: string; number: number}[];
}

export function MyPotions({emptyBottles, cookedPotions, ownedIngredients}: Props) {
  return (
    <Card title="Mes potions" useDividers fullWidth>
      {
        cookedPotions.length
          ? cookedPotions
            .map(potion => ({potion: potions.find(p => p.name === potion.name), number: potion.number}))
            .filter(({ potion }) => isDefined(potion))
            .map(({ potion, number }) => potion && <Potion key={potion.name} number={number} potion={potion} isOwned emptyBottles={emptyBottles} ownedIngredients={ownedIngredients} />)
          : <EmptyContent>
            {{
              emoji: "POTION",
              title: "Tu n'as aucune potion",
              description: "faites chauffer les chaudrons!!!"
            }}
          </EmptyContent>
      }
    </Card>
  );
}