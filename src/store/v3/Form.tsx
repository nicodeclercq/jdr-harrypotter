import React from 'react';
import { useForm, Controller } from 'react-hook-form';


import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Trait } from './v3';
import { roll } from '../../helpers/number';
import { Label } from '../../components/font/Label';


const defaultTraits = {
  Force: 0,
  Constitution: 0,
  Taille: 0,
  Perception: 0,
  Intelligence: 0,
  Dextérité: 0,
  Apparence: 0,
  Pouvoir: 0,
};


export function Form({callback}: {callback: (result: {traits: Record<Trait, number>}) => void}) {
  const { handleSubmit, setValue, control } = useForm<Record<Trait, number>>({
    defaultValues: defaultTraits
  })

  const onSubmit = (traits: Record<Trait, number>) => {
    callback({traits});
  }

  const rollDice = (trait: Trait) => () => {
    setValue(trait, roll(3, 'd6'));
  }

  return (
    <form  onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full">

        <div className="flex flex-row p-2 space-x-3 border-b-1 border-gray-100">
          <Label htmlFor="input-Force">Force</Label>
          <Controller
            name="Force"
            control={control}
            render={({value, onChange}) => <Input id="input-Force" value={value} type="number" theme="neutral" max="100" min="0" onChange={onChange} />}
          />
          <Button type="secondary" onClick={rollDice('Force')}>🎲</Button>
        </div>

        <div className="flex flex-row p-2 space-x-3 border-b-1 border-gray-100">
          <Label htmlFor="input-Constitution">Constitution</Label>
          <Controller
            name="Constitution"
            control={control}
            render={({value, onChange}) => <Input id="input-Constitution" value={value} type="number" theme="neutral" max="100" min="0" onChange={onChange} />}
          />
          <Button type="secondary" onClick={rollDice('Constitution')}>🎲</Button>
        </div>

        <div className="flex flex-row p-2 space-x-3 border-b-1 border-gray-100">
          <Label htmlFor="input-Taille">Taille</Label>
          <Controller
            name="Taille"
            control={control}
            render={({value, onChange}) => <Input id="input-Taille" value={value} type="number" theme="neutral" max="100" min="0" onChange={onChange} />}
          />
          <Button type="secondary" onClick={rollDice('Taille')}>🎲</Button>
        </div>

        <div className="flex flex-row p-2 space-x-3 border-b-1 border-gray-100">
          <Label htmlFor="input-Perception">Perception</Label>
          <Controller
            name="Perception"
            control={control}
            render={({value, onChange}) => <Input id="input-Perception" value={value} type="number" theme="neutral" max="100" min="0" onChange={onChange} />}
          />
          <Button type="secondary" onClick={rollDice('Perception')}>🎲</Button>
        </div>

        <div className="flex flex-row p-2 space-x-3 border-b-1 border-gray-100">
          <Label htmlFor="input-Intelligence">Intelligence</Label>
          <Controller
            name="Intelligence"
            control={control}
            render={({value, onChange}) => <Input id="input-Intelligence" value={value} type="number" theme="neutral" max="100" min="0" onChange={onChange} />}
          />
          <Button type="secondary" onClick={rollDice('Intelligence')}>🎲</Button>
        </div>

        <div className="flex flex-row p-2 space-x-3 border-b-1 border-gray-100">
          <Label htmlFor="input-Dextérité">Dextérité</Label>
          <Controller
            name="Dextérité"
            control={control}
            render={({value, onChange}) => <Input id="input-Dextérité" value={value} type="number" theme="neutral" max="100" min="0" onChange={onChange} />}
          />
          <Button type="secondary" onClick={rollDice('Dextérité')}>🎲</Button>
        </div>

        <div className="flex flex-row p-2 space-x-3 border-b-1 border-gray-100">
          <Label htmlFor="input-Apparence">Apparence</Label>
          <Controller
            name="Apparence"
            control={control}
            render={({value, onChange}) => <Input id="input-Apparence" value={value} type="number" theme="neutral" max="100" min="0" onChange={onChange} />}
          />
          <Button type="secondary" onClick={rollDice('Apparence')}>🎲</Button>
        </div>

        <div className="flex flex-row p-2 space-x-3 border-b-1 border-gray-100">
          <Label htmlFor="input-Pouvoir">Pouvoir</Label>
          <Controller
            name="Pouvoir"
            control={control}
            render={({value, onChange}) => <Input id="input-Pouvoir" value={value} type="number" theme="neutral" max="100" min="0" onChange={onChange} />}
          />
          <Button type="secondary" onClick={rollDice('Pouvoir')}>🎲</Button>
        </div>
        <Button onClick="submit" type="primary">Valider</Button>
      </div>
    </form>
  );
}