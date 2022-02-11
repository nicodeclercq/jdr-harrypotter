import React, { useCallback, useMemo } from 'react';
import { useForm, Controller, FieldError, FieldValues, UnpackNestedValue, DeepPartial } from 'react-hook-form';
import { pipe } from 'fp-ts/function';
import * as Record from 'fp-ts/Record';
import { entries } from '../helpers/object';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';
import { Label } from './font/Label';
import { createArray } from '../helpers/array';

export type StringValue = {
  defaultValue: string;
  label: string;
  isRequired?: boolean;
  validate?: (a: string) => boolean;
}
export type NumberValue = {
  defaultValue: number;
  isRequired?: boolean;
  label: string;
  min?: number;
  max?: number;
  validate?: (a: number) => boolean;
}
type PrimitiveValue = StringValue | NumberValue;
type FormValue = PrimitiveValue | ListValue<PrimitiveValue>;
export type ListValue<T extends PrimitiveValue> = Omit<T, 'validate'> & {
  values: T extends StringValue
    ? Array<{label:string, value: string} | string>
    : Array<{label:string, value: number} | number>;
  validate?: T extends StringValue ? (a: string) => boolean : (a: number) => boolean;
}
const isStringValue = (a: FormValue): a is StringValue => typeof a.defaultValue === 'string' && !('values' in a);
const isNumberValue = (a: FormValue): a is NumberValue => typeof a.defaultValue === 'number' && !('values' in a);
const isListValue = (a: FormValue): a is ListValue<PrimitiveValue> => 'values' in a;

type Props<T extends Record<string, string | number>, Key extends keyof T> = {
  fields: Record<Key, StringValue | ListValue<StringValue> | NumberValue | ListValue<NumberValue>>;
  onSubmit: (result: T) => void;
  onCancel?: () => void;
  template?: Array<Key | Key[]>;
}

export function Form<T extends Record<string, string | number>, Key extends keyof T>({ template, onCancel, fields, onSubmit }: Props<T, Key>) {
  const defaultValues = useMemo(() => pipe(
    fields,
    Record.map(
      ({defaultValue}) => defaultValue,
    )
  ), [fields]);

  const { handleSubmit, control, errors } = useForm<T>({
    defaultValues: defaultValues as UnpackNestedValue<DeepPartial<T>>,
  });

  const NumberInput = useCallback(({name, id, config}: {
    name: Key;
    id: string;
    config: NumberValue;
  }) => (
    <Controller
      name={name as string}
      control={control}
      rules={{ required: config.isRequired, min: config.min, max: config.max }}
      render={({value, onChange}) => (<>
        <Input
          id={id}
          value={value}
          errors={errors[name] as FieldError}
          type="number"
          theme="neutral"
          max={config.max}
          min={config.min}
          onChange={onChange}
          width="100%"
        />
      </>)}
    />
  ), [control, errors]);
  const StringInput = useCallback(({name, id, config}: {
    name: Key;
    id: string;
    config: StringValue;
  }) => (
    <Controller
      name={name as string}
      control={control}
      rules={{ required: config.isRequired, validate: config.validate }}
      render={({value, onChange}) => (<>
        <Input
          id={id}
          value={value}
          errors={errors[name] as FieldError}
          type="text"
          theme="neutral"
          onChange={onChange}
          width="100%"
        />
      </>)}
    />
  ), [control, errors]);
  const ListInput = useCallback(({options, name, isRequired = false}: {
    options: {label: string; value: string | number}[];
    name: Key;
    isRequired?: boolean
  }) => (
    <Controller
      name={name as string}
      control={control}
      rules={{ required: isRequired }}
      render={({value, onChange}) => (<>
        <Select
          id={`input-${name}`}
          value={value}
          theme="neutral"
          onChange={onChange}
          options={options}
          width="100%"
        />
      </>)}
    />
  ), [control]);
  const toOptions = useCallback(<T extends PrimitiveValue>({values}: ListValue<T>): {label: string, value: string | number}[] => values.map((value) => typeof value === 'object'
    ? value
    : {label: `${value}`, value}
  ), []);

  const hasError = Object.keys(errors).length > 0;

  const submitHandler = (record: FieldValues) => onSubmit(record as T);

  const columnsNb = useMemo(() => {
    if(!template){
      return 1;
    }
    return template
      .map(row => row instanceof Array ? row : [row])
      .reduce((acc, cur) => acc !== cur.length
        ? acc * cur.length
        : acc, 1);
  }, [template]);
  const gridTemplateColumns = useMemo(() =>
    createArray(columnsNb, 'max-content 1fr').join(' ')
  , [columnsNb]);
  const gridTemplateRows = useMemo(() => template != undefined
    ? template.map(() => 'min-content').join(' ')
    : Object.keys(fields).fill('min-content').join(' ')
  , [template, fields]);
  const gridTemplateAreas = useMemo(() => {
    if(!template){
      return Object.keys(fields)
        .map(fieldName => `"label-${fieldName} input-${fieldName}"`)
        .join(' ')
    }
    return template
      .map(row => row instanceof Array ? row : [row])
      .map(row => {
        const colSpan = (columnsNb * 2 - row.length) / row.length;
        return row
          .map((fieldName) => `label-${fieldName} ${createArray(colSpan, `input-${fieldName}`).join(' ')}`)
          .join(' ');
      })
      .reduce((acc, cur) => `${acc} "${cur}"`, '');
  }, [columnsNb, fields, template]);

  const styles = useMemo(() => ({
    gridTemplateAreas,
    gridTemplateColumns,
    gridTemplateRows,
    display: 'grid',
    gap: '1rem',
  }), [gridTemplateColumns, gridTemplateRows, gridTemplateAreas]);

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
    >
      <div
        style={styles}
      >
        {
          entries(fields).map(([name, value]) => (<React.Fragment key={name as string}>
            <Label htmlFor={`input-${name}`} gridArea={`label-${name}`}>{value.label}</Label>
            <div style={{gridArea: `input-${name}`}}>
            {
                isListValue(value)    ? (<ListInput name={name} options={toOptions(value)} isRequired={value.isRequired} />)
              : isStringValue(value) ? (<StringInput id={`input-${name}`} name={name} config={value} />)
              : isNumberValue(value)  ? (<NumberInput id={`input-${name}`} name={name} config={value} />)
              : /* default */           (<></>)
            }
            </div>
          </React.Fragment>))
        }
      </div>
      <div className="flex justify-end w-full pt-4 gap-2">
        {
          onCancel && (
            <Button onClick={onCancel} disabled={hasError} type="secondary">Annuler</Button>
          )
        }
        <Button onClick="submit" disabled={hasError} type="primary">Valider</Button>
      </div>
    </form>
  );
}