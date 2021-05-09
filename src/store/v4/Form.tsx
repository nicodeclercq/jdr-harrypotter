import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { prompt } from '../../helpers/io';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Skills } from './v4';
import { Label } from '../../components/font/Label';
import { skills } from '../../pages/skills/skills';
import { entries } from '../../helpers/object';

const isDefined = <T extends unknown>(value: T | null | undefined): value is T => value != null;
// @ts-ignore
const isMin = (value: unknown): value is {min: number} => isDefined(value) && typeof value === 'object' && 'min' in value;

const defaultSkills = entries(skills((name: string) => prompt(() => <>Hello World</>)))
  .filter(([, value]) => isMin(value))
  .map(([name,  value]) => ({name, min: (value as {min:number}).min}))
  .reduce((acc, {name, min}) => ({
    ...acc, 
    [name]: min,
  }), {});


export function Form({callback}: {callback: (result: {skills: Skills}) => void}) {
  const [skillList] = useState(defaultSkills);
  const { handleSubmit, control, errors } = useForm<Record<string, number>>({
    defaultValues: defaultSkills
  });

  console.log(defaultSkills, skills);

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
        {
          entries(skillList).map(([skill, {min}]) => (
            <div className="flex flex-row p-2 space-x-3 border-b-1 border-gray-100">
              <Label htmlFor={`input-${skill}`}>{skill}</Label>
              <Controller
                name={skill}
                control={control}
                rules={{ required: true, min, max: 100 }}
                render={({value, onChange}) => (
                  <Input
                    id={`input-${skill}`}
                    errors={errors[skill]}
                    value={value}
                    type="number"
                    theme="neutral"
                    max="100"
                    min="0"
                    onChange={onChange}
                  />
                )}
              />
            </div>
          ))
        }
        <Button onClick="submit" type="primary">Valider</Button>
      </div>
    </form>
  );
}