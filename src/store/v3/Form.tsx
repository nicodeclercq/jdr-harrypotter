import React from 'react';
import { useForm, Controller } from 'react-hook-form';


import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Trait } from './v3';
import { roll } from '../../helpers/number';
import { Label } from '../../components/font/Label';
import { Icon } from '../../components/icons/Icon';

const rollTrait = () => roll(2, 'd6') + 6;

const defaultTraits = {
  Force: rollTrait(),
  Constitution: rollTrait(),
  Taille: rollTrait(),
  Perception: rollTrait(),
  Intelligence: rollTrait(),
  Dextérité: rollTrait(),
  Apparence: rollTrait(),
  Pouvoir: rollTrait(),
};


export function Form({callback}: {callback: (result: {traits: Record<Trait, number>}) => void}) {
  const { handleSubmit, setValue, control, errors } = useForm<Record<Trait, number>>({
    defaultValues: defaultTraits
  })

  const onSubmit = (traits: Record<Trait, number>) => {
    callback({traits});
  }

  const rollDice = (trait: Trait) => () => {
    setValue(trait, rollTrait());
  }

  return (
    <form  onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full">

        <div className="flex flex-row p-2 border-gray-100 space-x-3 border-b-1">
          <Label htmlFor="input-Force">Force</Label>
          <Controller
            name="Force"
            control={control}
            rules={{ required: true, min: 1, max: 20 }}
            render={({value, onChange}) => <Input id="input-Force" errors={errors['Force']} value={value} type="number" theme="neutral" max="100" min="0" onChange={onChange} />}
          />
          <div className="">
            <Button type="secondary" onClick={rollDice('Force')}>
              <Icon name="DICE" />
            </Button>
          </div>
        </div>

        <div className="flex flex-row p-2 border-gray-100 space-x-3 border-b-1">
          <Label htmlFor="input-Constitution">Constitution</Label>
          <Controller
            name="Constitution"
            control={control}
            rules={{ required: true, min: 1, max: 20 }}
            render={({value, onChange}) => <Input id="input-Constitution" value={value} type="number" theme="neutral" max="100" min="0" onChange={onChange} />}
          />
          <div className="">
            <Button type="secondary" onClick={rollDice('Constitution')}>
              <Icon name="DICE" />
            </Button>
          </div>
        </div>

        <div className="flex flex-row p-2 border-gray-100 space-x-3 border-b-1">
          <Label htmlFor="input-Taille">Taille</Label>
          <Controller
            name="Taille"
            control={control}
            rules={{ required: true, min: 1, max: 20 }}
            render={({value, onChange}) => <Input id="input-Taille" value={value} type="number" theme="neutral" max="100" min="0" onChange={onChange} />}
          />
          <div className="">
            <Button type="secondary" onClick={rollDice('Taille')}>
              <Icon name="DICE" />
            </Button>
          </div>
        </div>

        <div className="flex flex-row p-2 border-gray-100 space-x-3 border-b-1">
          <Label htmlFor="input-Perception">Perception</Label>
          <Controller
            name="Perception"
            control={control}
            rules={{ required: true, min: 1, max: 20 }}
            render={({value, onChange}) => <Input id="input-Perception" value={value} type="number" theme="neutral" max="100" min="0" onChange={onChange} />}
          />
          <div className="">
            <Button type="secondary" onClick={rollDice('Perception')}>
              <Icon name="DICE" />
            </Button>
          </div>
        </div>

        <div className="flex flex-row p-2 border-gray-100 space-x-3 border-b-1">
          <Label htmlFor="input-Intelligence">Intelligence</Label>
          <Controller
            name="Intelligence"
            control={control}
            rules={{ required: true, min: 1, max: 20 }}
            render={({value, onChange}) => <Input id="input-Intelligence" value={value} type="number" theme="neutral" max="100" min="0" onChange={onChange} />}
          />
          <div className="">
            <Button type="secondary" onClick={rollDice('Intelligence')}>
              <Icon name="DICE" />
            </Button>
          </div>
        </div>

        <div className="flex flex-row p-2 border-gray-100 space-x-3 border-b-1">
          <Label htmlFor="input-Dextérité">Dextérité</Label>
          <Controller
            name="Dextérité"
            control={control}
            rules={{ required: true, min: 1, max: 20 }}
            render={({value, onChange}) => <Input id="input-Dextérité" value={value} type="number" theme="neutral" max="100" min="0" onChange={onChange} />}
          />
          <div className="">
            <Button type="secondary" onClick={rollDice('Dextérité')}>
              <Icon name="DICE" />
            </Button>
          </div>
        </div>

        <div className="flex flex-row p-2 border-gray-100 space-x-3 border-b-1">
          <Label htmlFor="input-Apparence">Apparence</Label>
          <Controller
            name="Apparence"
            control={control}
            rules={{ required: true, min: 1, max: 20 }}
            render={({value, onChange}) => <Input id="input-Apparence" value={value} type="number" theme="neutral" max="100" min="0" onChange={onChange} />}
          />
          <div className="">
            <Button type="secondary" onClick={rollDice('Apparence')}>
              <Icon name="DICE" />
            </Button>
          </div>
        </div>

        <div className="flex flex-row p-2 border-gray-100 space-x-3 border-b-1">
          <Label htmlFor="input-Pouvoir">Pouvoir</Label>
          <Controller
            name="Pouvoir"
            control={control}
            rules={{ required: true, min: 1, max: 20 }}
            render={({value, onChange}) => <Input id="input-Pouvoir" value={value} type="number" theme="neutral" max="100" min="0" onChange={onChange} />}
          />
          <div className="">
            <Button type="secondary" onClick={rollDice('Pouvoir')}>
              <Icon name="DICE" />
            </Button>
          </div>
        </div>
        <Button onClick="submit" type="primary">Valider</Button>
      </div>
    </form>
  );
}