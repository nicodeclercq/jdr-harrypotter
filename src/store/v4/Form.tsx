import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Skills } from './v4';
import { State } from '../v3/v3';
import { Label } from '../../components/font/Label';
import { skills } from '../../pages/skills/skills';
import { entries } from '../../helpers/object';

const defaultSkills = entries(skills);
const repartitionPoints = 300;

export function Form({state: { traits }, callback}: {state: State,callback: (result: {skills: Skills}) => void}) {
  const initialPoints = defaultSkills.reduce((acc, [,{ min, baseTrait }]) => acc + (traits[baseTrait] > min ? traits[baseTrait] : min), 0);
  const [remainingPoints, setRemainingPoints] = useState(repartitionPoints);
  const { handleSubmit, control, errors, setValue } = useForm<Record<string, number>>({
    defaultValues: defaultSkills.reduce((acc, [name, {min, baseTrait}]) => ({
        ...acc,
        [name]: traits[baseTrait] > min
          ? traits[baseTrait]
          : min
      }),
      {} as Record<string, number>
    )
  });

  const onSubmit = (results: Record<string, number>) => {
    const skills = entries(results)
        .reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: {
              currentLevel: value,
            }
          }),
          {}
        );
    callback({skills});
  }

  return (
    <form  onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full">
          <div className="overflow-y-auto" style={{height: '70vh'}}>
            {
              defaultSkills.map(([skill, { baseTrait, min }]) => (
                <div className="flex flex-row p-2 border-gray-100 space-x-3 border-b-1">
                  <Label htmlFor={`input-${skill}`}>{skill}</Label>
                  <Controller
                    name={skill}
                    control={control}
                    rules={{ required: true, min: traits[baseTrait] > min ? traits[baseTrait] : min, max: traits[baseTrait] * 5 }}
                    render={({value, onChange}) => (<>
                      <Button type="secondary" onClick={() => setValue(skill, traits[baseTrait])}>Min ({traits[baseTrait]}%)</Button>
                      <Input
                        id={`input-${skill}`}
                        errors={errors[skill]}
                        value={value}
                        type="number"
                        theme="neutral"
                        max={traits[baseTrait] * 5}
                        min={traits[baseTrait] > min ? traits[baseTrait] : min}
                        onChange={onChange}
                      />
                      <Button type="secondary" onClick={() => setValue(skill, traits[baseTrait] * 5)}>Max ({traits[baseTrait] * 5}%)</Button>
                    </>)}
                  />
                </div>
              ))
            }
          </div>
          <div className="space-x-2">
            <Button onClick="submit" type="primary">Valider</Button>
            <span>{remainingPoints}/{repartitionPoints} points à répartir</span>
          </div>
      </div>
    </form>
  );
}