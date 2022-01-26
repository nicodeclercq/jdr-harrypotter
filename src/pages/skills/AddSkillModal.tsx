import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Button } from '../../components/Button';
import { Label } from '../../components/font/Label';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';

type Props = {
  onSubmit: (newSkill: { name: string, currentLevel: number}) => void;
  onCancel: () => void; 
};

export function AddSkillModal({ onCancel, onSubmit}: Props) {
  const { handleSubmit, control, errors } = useForm<{name: string; currentLevel: number}>({
    defaultValues: {
      name: '',
      currentLevel: 10,
    }
  })

  return (
    <Modal
      header="Nouvelle compétence"
    >
      <form  onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col space-y-1">
            <Label htmlFor="input-name">Nom de la compétence</Label>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({value, onChange}) => (
                <Input
                  id="input-name"
                  errors={errors.name}
                  value={value}
                  type="text"
                  theme="neutral"
                  onChange={onChange}
                  width="100%"
                />
              )}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="input-currentLevel">Pourcentage de réussite</Label>
            <Controller
              name="currentLevel"
              control={control}
              rules={{ required: true, min: 1, max: 100 }}
              render={({value, onChange}) => (
                <Input
                  id="input-currentLevel"
                  errors={errors.currentLevel}
                  value={value}
                  type="number"
                  theme="neutral"
                  onChange={onChange}
                  width="100%"
                />
              )}
            />
          </div>
        </div>
        <div className="flex justify-end pt-8 space-x-4">
          <Button
              type="secondary"
              onClick={onCancel}
            >
              Annuler
            </Button>
          <Button
            type="primary"
            onClick="submit"
          >
            Ajouter
          </Button>
        </div>
      </form>
    </Modal>
  );
}