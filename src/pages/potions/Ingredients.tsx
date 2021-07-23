import React from 'react';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { usePotions } from './usePotions';
import { Card } from '../../components/Card';
import { Accordion } from '../../components/Accordion';
import { Label } from '../../components/font/Label';
import { Input } from '../../components/Input';
import { Tag } from '../../components/Tag';
import { ingredients } from './potions';
import { Icon } from '../../components/icons/Icon';
import { Title } from '../../components/font/Title';

type Props = {
  ownedIngredients: {
    id: string,
    number: number,
  }[],
  ownedBottles: number,
}

type Form = {
  ingredients: {
    name: string,
    number: number,
  }[],
  emptyBottles: number,
};

export function Ingredients ({ownedIngredients, ownedBottles}: Props) {
  const { setOwnedIngredientsAndBottles } = usePotions();
  const { handleSubmit, control } = useForm<Form>({
    defaultValues: {
      ingredients: ingredients.map(ingredient => ({
        name: ingredient.name,
        number: ownedIngredients.find(owned => owned.id === ingredient.name)?.number ?? 0
      })),
      emptyBottles: ownedBottles,
    },
  });
  const { fields } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const onSubmit = ({ingredients: newIngredients, emptyBottles}: Form) => {
    setOwnedIngredientsAndBottles(
      newIngredients
        .map(({number}, i) => ({
          id: ingredients[i].name,
          number,
        }))
        .filter(({number}) => number > 0),
      emptyBottles,
    );
  };

  const getScarcityColor = (ingredient: string) => {
    const scarcity = {
      "Très rare": 'purple',
      "Insolite": 'red',
      "Usuel": 'yellow',
      "Commun": 'green',
      undefined: 'gray',
    } as const;

    return scarcity[getScarcityValue(ingredient) ?? 'undefined'];
  }

  const getScarcityValue = (ingredient: string) => {
    return ingredients.find(i => i.name === ingredient)?.scarcity;
  }

  return (
    <Card fullWidth>
      <Accordion>
        {{
          header: <div className="flex items-center space-x-2">
            <span className="text-lg text-gray-500">
              <Icon name="INGREDIENTS" />
            </span>
            <Title>Ingrédients</Title>
          </div>,
          toggle: <Icon name="DOWN" />,
          content: <form  onSubmit={handleSubmit(onSubmit)}>
            <div className="overflow-y-auto grid gap-2 grid-cols-2" style={{maxHeight: '20rem'}}>
              <div className="p-2 bg-gray-200 rounded">
                <Controller
                  name="emptyBottles"
                  control={control}
                  rules={{ required: true, min: 0}}
                  render={({value, onChange }) => (
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
              {
                fields.map((field, index) => (
                  <div key={field.id}>
                    <Controller
                      name={`ingredients.${index}.number`}
                      defaultValue={field.number}
                      control={control}
                      rules={{ required: true, min: 0}}
                      render={({value, onChange }) => (
                        <div className="flex flex-row items-start p-2 space-x-2">
                          <Input
                            id={`${field.id}_value`}
                            theme="neutral"
                            type="number"
                            onChange={onChange}
                            onBlur={handleSubmit(onSubmit)}
                            value={value}
                          />
                          <Label htmlFor={`${field.id}_value`}>{field.name}</Label>
                          <Tag title="" color={getScarcityColor(field.name)}>{getScarcityValue(field.name)}</Tag>
                        </div>
                      )}
                    />
                  </div>
                ))
              }
            </div>
          </form>
        }}
      </Accordion>
    </Card>
  )
}
