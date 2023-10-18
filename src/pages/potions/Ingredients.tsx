import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { constant, pipe } from "fp-ts/function";

import { usePotions } from "./usePotions";
import { Card } from "../../components/Card";
import { Accordion } from "../../components/Accordion";
import { Label } from "../../components/font/Label";
import { Input } from "../../components/Input";
import { Tag } from "../../components/Tag";
import { ingredients } from "./potions";
import { Icon } from "../../components/icons/Icon";
import { Title } from "../../components/font/Title";
import { getOrElse } from "../../helpers/number";

const scarcity = {
  "Très rare": "purple",
  Insolite: "red",
  Usuel: "yellow",
  Commun: "green",
  undefined: "gray",
} as const;

type Props = {
  ownedIngredients: {
    name: string;
    number: number;
  }[];
  ownedBottles: number;
};

type Form = {
  [name in (typeof ingredients)[number]["name"]]: number;
} & {
  emptyBottles: number;
};

export function Ingredients({ ownedIngredients, ownedBottles }: Props) {
  const { setOwnedIngredientsAndBottles } = usePotions();
  const { handleSubmit, control, getValues, setValue } = useForm<Form>({
    defaultValues: {
      ...ingredients.reduce(
        (acc, ingredient) => ({
          ...acc,
          [ingredient.name]:
            ownedIngredients.find((owned) => owned.name === ingredient.name)
              ?.number ?? 0,
        }),
        {} as Form
      ),
      emptyBottles: ownedBottles,
    },
  });

  useEffect(() => {
    // keeps ownedBottles in sync with form value
    const currentValues = getValues();

    if (ownedBottles !== currentValues.emptyBottles) {
      setValue("emptyBottles", ownedBottles);
    }
  }, [getValues, ownedBottles, setValue]);

  useEffect(() => {
    // keeps ownedIngredients in sync with form value
    const currentValues = getValues();

    ownedIngredients.forEach((ingredient) => {
      if (ingredient.number !== currentValues[ingredient.name]) {
        setValue(ingredient.name, ingredient.number);
      }
    });
  }, [ownedIngredients, getValues, setValue]);

  const onSubmit = ({ emptyBottles, ...newIngredients }: Form) => {
    const newValues = Object.entries(newIngredients)
      .map(([name, number]) => ({
        name,
        number: pipe(number, getOrElse(constant(0))),
      }))
      .filter(({ number }) => number > 0);

    setOwnedIngredientsAndBottles(newValues, emptyBottles);
  };

  const getScarcityColor = (ingredient: string) =>
    scarcity[getScarcityValue(ingredient) ?? "undefined"];
  const getScarcityValue = (ingredient: string) =>
    ingredients.find((i) => i.name === ingredient)?.scarcity;

  return (
    <Card fullWidth>
      <Accordion>
        {{
          header: (
            <div className="flex items-center space-x-2">
              <span className="text-lg text-gray-500">
                <Icon name="INGREDIENTS" />
              </span>
              <Title>Ingrédients</Title>
            </div>
          ),
          toggle: <Icon name="DOWN" />,
          content: (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div
                className="overflow-y-auto grid gap-2 grid-cols-2"
                style={{ maxHeight: "20rem" }}
              >
                <div className="p-2 bg-gray-200 rounded">
                  <Controller
                    name="emptyBottles"
                    control={control}
                    rules={{ required: true, min: 0 }}
                    render={({ field: { value, onChange } }) => (
                      <div className="flex flex-row items-center space-x-2">
                        <Input
                          id="emptyBottles_value"
                          theme="neutral"
                          type="number"
                          onChange={onChange}
                          onBlur={handleSubmit(onSubmit)}
                          value={value}
                        />
                        <Icon name="POTION" />
                        <Label htmlFor="emptyBottles_value">Fioles vides</Label>
                      </div>
                    )}
                  />
                </div>
                {ingredients.map((ingredient) => (
                  <div key={ingredient.name}>
                    <Controller
                      name={ingredient.name}
                      // defaultValue={0}
                      control={control}
                      rules={{ required: true, min: 0 }}
                      render={({ field: { value, onChange } }) => (
                        <div>
                          <Tag
                            title=""
                            color={getScarcityColor(ingredient.name)}
                          >
                            {getScarcityValue(ingredient.name)}
                          </Tag>
                          <div className="flex flex-row items-start p-2 space-x-2">
                            <Input
                              id={`${ingredient.name}_value`}
                              theme="neutral"
                              type="number"
                              onChange={onChange}
                              onBlur={handleSubmit(onSubmit)}
                              value={value}
                            />
                            <Label htmlFor={`${ingredient.name}_value`}>
                              {ingredient.name}
                            </Label>
                          </div>
                        </div>
                      )}
                    />
                  </div>
                ))}
              </div>
            </form>
          ),
        }}
      </Accordion>
    </Card>
  );
}
