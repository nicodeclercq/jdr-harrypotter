import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import { Label } from '../../components/font/Label';
import { Input } from '../../components/Input';

type FormType = {
  name: string;
};

type Props = {
  defaultValue: string;
  names?: string[];
  callback: (value: string) => void;
};

export function NameForm({defaultValue, names = [], callback}: Props) {
  const { handleSubmit, control, errors } = useForm<FormType>({
    defaultValues: {
      name: defaultValue
    },
  });

  const onSubmit = (formValues: FormType) => {
    callback(formValues.name);
  }

  return (
    <form  onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col p-2 space-y-4">
        <Controller
            name="name"
            control={control}
            rules={{ required: true, min: 1, max: 20 }}
            render={({value, onChange}) => 
              <div className="flex flex-row p-2 border-gray-100 space-x-3 border-b-1">
                <Label htmlFor="input-name">Nom</Label>
                <Input
                  id="input-name"
                  errors={errors['name']}
                  value={value}
                  type="text"
                  theme="neutral"
                  onChange={onChange}
                  list="input-name-list"
                  autoComplete={names ? 'on' : 'off'}
                />
                <datalist id="input-name-list">
                    {names.map((name) => <option  key={name} value={name} />)}
                </datalist>
              </div>
            }
          />
          <Button onClick="submit" type="primary">Valider</Button>
      </div>
    </form>
  );
}