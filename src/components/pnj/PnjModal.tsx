import React from 'react';
import { random } from '../../helpers/number';
import { Form, ListValue, NumberValue, StringValue } from '../Form';
import { Modal } from '../Modal';
import { colors } from './character';
import { PNJ } from './pnj.entity';

type Props = {
  pnj?: PNJ;
  onSubmit: (record: PNJ) => void;
  onCancel: () => void;
};

type Fields = {
  name: StringValue;
  description: StringValue;
  character: StringValue;
  age: NumberValue;
  gender: ListValue<StringValue>;
  magics: StringValue;
};

export function PnjModal({ pnj, onSubmit, onCancel}: Props){
  const fields:Fields = {
    name: {
      label: 'Nom',
      defaultValue: pnj?.name ?? '',
    },
    description: {
      label: 'Description',
      defaultValue: pnj?.description ?? '',
    },
    character: {
      label: 'Caractère',
      defaultValue: pnj?.character.join(' | ') ?? '',
    },
    age: {
      label: 'Age',
      defaultValue: pnj?.age ?? 30,
      min: 0,
      max: 99,
    },
    gender: {
      label: 'Genre',
      defaultValue: pnj?.gender ?? 'Femme',
      values: ['Homme', 'Femme'],
    },
    magics: {
      label: 'Type de magie',
      defaultValue: pnj?.magics ?? '',
    }
  };

  const handleSubmit = (
    record: {
      name: string;
      description: string;
      character: string;
      age: number;
      gender: 'Homme' | 'Femme';
      magics: string;
  }) => {
    const result: PNJ = {
      name: record.name,
      age: record.age,
      character: record.character.split('|').map((v) => v.trim()),
      color: pnj?.color ?? colors[random(0, colors.length -1)],
      gender: record.gender,
      magics: record.magics,
      description: record.description,
    }
    onSubmit(result);
  }

  return (
    <Modal header="Modifier le PNJ">
      <Form
        onCancel={onCancel}
        onSubmit={handleSubmit}
        fields={fields}
      />
    </Modal>
  )
}