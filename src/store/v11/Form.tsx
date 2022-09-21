import React from 'react';
import { pipe } from 'fp-ts/function';
import * as Record from 'fp-ts/Record';
import * as Option from 'fp-ts/Option';
import { Form as CForm, ValuesFromList, StringValue} from '../../components/Form';
import { State } from '../v10/v10';

type Props = {
  state: State,
  callback: (result: {lockKeys: string[]}) => void
};

const MAGICS = {
  'Sorts': 'alohomora',
  'Runes': 'futhark',
  'Cartomancie': 'double vue',
  'Arythmancie': 'pythagore',
  'Potions': 'felix felicis'
};

type Fields = {
  lockKeys: ValuesFromList<StringValue>;
};
const fields:Fields = {
  lockKeys: {
    label: 'Types de magie connue',
    defaultValue: [],
    values: Object.keys(MAGICS),
  },
};

export function Form({callback}: Props) {

  const submit = (result: {lockKeys: string[]}) => {
    pipe(
      result,
      Record.modifyAt('lockKeys', (values: string[]) => (values as Array<keyof typeof MAGICS>).map(v => MAGICS[v])),
      Option.fold(
        () => {
          throw new Error('Unexpected result');
        },
        callback,
      ),
    );
  }

  return (
    <CForm
        onSubmit={submit}
        fields={fields}
      />
  );
}