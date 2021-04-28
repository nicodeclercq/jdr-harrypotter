import * as IO from 'io-ts';
import React from 'react';
import { canceled, Interaction } from '../helpers/interaction';
import { Button } from './Button';
import { Modal } from './Modal';

type Props<T, U> = { title: string; description: string; decoder: IO.Decoder<T, U>, onImport: (result: Interaction<never, U>) => void};

export function ImportModal<T, U>({ title, description, onImport}: Props<T, U>) {

  const onSubmit = () =>{

  };

  return (
    <Modal
      header={title}
    >
      {description}
      <Button type="secondary" onClick={() => onImport(canceled)}>Importer</Button>
      <Button type="primary" onClick={onSubmit}>Importer</Button>
    </Modal>
  );
}