import React from 'react';
import { FieldError } from 'react-hook-form';
import { entries } from '../helpers/object';

type Props = {
  errors: FieldError;
  messages?: Record<string, string>;
};

const defaultMessages = {
  required: 'Ce champs est obligatoire',
  min: 'La valeur est trop basse',
  max: 'La valeur est trop haute',
};

export function ErrorMessage({
  errors,
  messages = {},
}: Props){
  const displayesMessages = entries({...defaultMessages, ...messages})
    .map(([key, value]) => errors.type === key
      ? <span key={`error_${key}`} className="text-sm text-red-800">⚠️ {value}</span>
      : undefined
    )
    .filter(value => value != null);

  return (
    <>
      {displayesMessages}
    </>
  )
}