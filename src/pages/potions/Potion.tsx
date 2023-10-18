import { useState } from "react";
import { pipe } from "fp-ts/function";

import { Accordion } from "../../components/Accordion";
import { Button } from "../../components/Button";
import { BodyText } from "../../components/font/BodyText";
import { Potion as PotionType } from "./potions";
import { PotionCategoryTag } from "../../components/PotionTypeTag";
import { Table } from "../../components/Table";
import { Icon } from "../../components/icons/Icon";
import { RollModal } from "../../components/RollModal";
import { usePotions } from "./usePotions";
import * as Interaction from "../../helpers/interaction";
import { noop } from "../../helpers/function";
import { Caption } from "../../components/font/Caption";

type Props = {
  emptyBottles: number;
  ownedIngredients: { name: string; number: number }[];
  potion: PotionType;
  isOwned?: boolean;
  number?: number;
};

export function Potion({
  number,
  emptyBottles,
  ownedIngredients,
  potion,
  isOwned = false,
}: Props) {
  const [displayRollModal, setDisplayRollModal] = useState(false);
  const { cookPotion, usePotion } = usePotions();

  const hasIngredient = (ingredient: string) =>
    ownedIngredients.filter(
      (owned) => owned.name === ingredient && owned.number > 0
    ).length === 1;
  const hasAllIngredients = pipe(
    potion.ingredients.reduce((acc, cur) => acc && hasIngredient(cur), true),
    (hasAllIngrediens: boolean) => hasAllIngrediens
  );
  const onRollEnd = (result: Interaction.Interaction<never, number>) => {
    pipe(
      result,
      Interaction.fold({
        success: () => usePotion(potion.name, true),
        failure: () => usePotion(potion.name, false),
        canceled: noop,
      }),
      () => setDisplayRollModal(false)
    );
  };

  return (
    <>
      <Accordion>
        {{
          header: (
            <div className="flex">
              <div className="flex-grow text-left capitalize space-x-2">
                {number && <Caption>{number}</Caption>}
                <PotionCategoryTag type={potion.type} />
                <BodyText>{potion.name}</BodyText>
              </div>
              {!isOwned && (
                <div>
                  {hasAllIngredients && emptyBottles > 0 ? (
                    <span className="text-green-600">
                      <Icon name="CHECK" />
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </div>
          ),
          content: (
            <div className="flex flex-col mb-4 space-y-4">
              <div className="flex-grow text-left capitalize space-x-2 space-y-2">
                <hr className="border-y" />
                <div>
                  <BodyText>{potion.description}</BodyText>
                </div>
                {!isOwned && (
                  <div className="space-x-2">
                    <Table
                      headers={["Ingrédient 1", "Ingrédient 2", "Ingrédient 3"]}
                      values={[
                        potion.ingredients.map((ingredient) => (
                          <div key={ingredient} className="space-x-2">
                            {hasIngredient(ingredient) ? (
                              <span className="text-green-600">
                                <Icon name="CHECK" />
                              </span>
                            ) : (
                              <span className="text-red-700">
                                <Icon name="CROSS" />
                              </span>
                            )}
                            <BodyText>{ingredient}</BodyText>
                          </div>
                        )),
                      ]}
                    />
                  </div>
                )}
              </div>
              {!isOwned && (
                <div className="self-end">
                  <Button
                    type="secondary"
                    onClick={() => cookPotion(potion.name)}
                  >
                    + Mijoter
                  </Button>
                </div>
              )}
            </div>
          ),
          actions: isOwned && (
            <Button
              type="secondary"
              onClick={() => {
                setDisplayRollModal(true);
              }}
            >
              + Utiliser
            </Button>
          ),
        }}
      </Accordion>
      {displayRollModal && (
        <RollModal
          successPercentage={75}
          title="Récupération de la fiole après utilisation"
          onRollEnd={onRollEnd}
        />
      )}
    </>
  );
}
