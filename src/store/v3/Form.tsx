import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';


import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Trait } from './v3';
import { roll, random } from '../../helpers/number';
import { Label } from '../../components/font/Label';
import { Icon } from '../../components/icons/Icon';
import { keys, map } from '../../helpers/object';
import { createArray } from '../../helpers/array';

const rollTrait = () => roll(2, 'd6') + 6;

const defaultTraits: Record<Trait, number> = {
  Force: rollTrait(),
  Constitution: rollTrait(),
  Perception: rollTrait(),
  Intelligence: rollTrait(),
  Dextérité: rollTrait(),
  Charisme: rollTrait(),
  Pouvoir: rollTrait(),
};

export function Form({callback}: {callback: (result: {traits: Record<Trait, number>}) => void}) {
  const [remainingPoints, setRemainingPoints] = useState(0);
  const { handleSubmit, setValue, getValues, control, errors } = useForm<Record<Trait, number>>({
    defaultValues: defaultTraits
  })

  const onSubmit = (traits: Record<Trait, number>) => {
    callback({traits: map((trait) => trait * 1, traits)});
  }

  const rollAll = () => {
    const MIDDLE = 12;

    const traits = keys(defaultTraits);
    const randomValues = createArray(Math.floor(traits.length / 2))
      .map(() => random(0, 6));

    traits
      .sort(() => random(-1, 1))
      .map((trait, index) => {
        if(index < randomValues.length) {
          return {trait, value: MIDDLE + randomValues[index]};
        }
        const i = index % randomValues.length;
        if(Math.floor(index / 2) < randomValues.length){
          return {trait, value: MIDDLE - randomValues[i]};
        }
        return {trait, value: MIDDLE};
      })
      .forEach(({trait, value}) => {
        setValue(trait, value)
      });
  }

  const onTraitChange = (trait: Trait, callback: (value: number | undefined) => void) => (value: number | undefined) => {
    const currentValue = getValues()[trait];
    setRemainingPoints(remainingPoints - (value ?? 0) + currentValue);
    callback(value);
  }

  return (
    <form  onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full">
        {
          keys(defaultTraits)
            .sort()
            .map((trait: Trait) => (
              <div key={trait} className="flex flex-row p-2 border-gray-100 space-x-3 border-b-1">
                <Label htmlFor={`input-${trait}`}>{trait}</Label>
                <Controller
                  name={trait}
                  control={control}
                  rules={{ required: true, min: 1, max: 20 }}
                  render={({value, onChange}) => (
                    <Input
                      id={`input-${trait}`}
                      errors={errors[trait]}
                      value={value}
                      type="number"
                      theme="neutral"
                      max="18"
                      min="6"
                      onChange={onTraitChange(trait, onChange)}
                    />
                  )}
                />
              </div>
            ))
        }
        <div className="flex flex-row items-center space-x-2">
          <Button onClick="submit" type="primary">Valider</Button>
          <div className="flex flex-row justify-between flex-grow p-2">
            <span className={
              remainingPoints < 0
                ? 'text-red-500'
                : ''
            }>{
              remainingPoints === 0  
                ? ''
                : remainingPoints > 0
                ? `Il reste ${remainingPoints} point${remainingPoints === 1 ? '' : 's'} à répartir`
                : `Tu as utilisé ${remainingPoints * -1} point${remainingPoints === -1 ? '' : 's'} de trop`
            }
            </span>
            <Button type="secondary" onClick={rollAll}>
              <Icon name="DICE" />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}