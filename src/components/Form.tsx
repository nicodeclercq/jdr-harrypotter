import React, { useCallback, useMemo } from 'react';
import { useForm, Controller, FieldError, FieldValues, UnpackNestedValue, DeepPartial } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
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
type FormValue = PrimitiveValue | ValueFromList<PrimitiveValue> | ValuesFromList<PrimitiveValue>;
export type ValueFromList<T extends PrimitiveValue> = Omit<T, 'validate'> & {
  values: T extends StringValue
    ? Array<{label:string, value: string} | string>
    : Array<{label:string, value: number} | number>;
  validate?: T extends StringValue ? (a: string) => boolean : (a: number) => boolean;
}
export type ValuesFromList<T extends PrimitiveValue> = Omit<T, 'validate' | 'defaultValue'> & {
  defaultValue: T['defaultValue'][];
  values: T extends StringValue
    ? Array<{label:string, value: string} | string>
    : Array<{label:string, value: number} | number>;
  validate?: T extends StringValue ? (a: string[]) => boolean : (a: number[]) => boolean;
}
const isStringValue = (a: FormValue): a is StringValue => typeof a.defaultValue === 'string' && !('values' in a);
const isNumberValue = (a: FormValue): a is NumberValue => typeof a.defaultValue === 'number' && !('values' in a);
const isValueFromList = <P extends PrimitiveValue>(a: FormValue): a is ValueFromList<P> => 'values' in a;
const isValuesFromList = <P extends PrimitiveValue>(a: FormValue): a is ValuesFromList<P> => 'values' in a && a['values'] instanceof Array;

type Fields<T extends string> = {[key in T]: FormValue};
export type ValuesFromDefintion<T extends Fields<string>> = {
  [key in keyof T]: T[key]['defaultValue']
};
type Props<F extends Fields<Key>, Key extends string> = {
  fields: F;
  onSubmit: (result: ValuesFromDefintion<F>) => void;
  onCancel?: () => void;
  template?: Array<Key | Key[]>;
  submitOnBlur?: boolean;
}

export function Form<T extends Fields<Key>, Key extends string>({ template, onCancel, fields, onSubmit, submitOnBlur = false }: Props<T, Key>) {
  const formId = uuid();
  const defaultValues = useMemo(() => pipe(
    fields,
    Record.map(
      (definition: FormValue) => definition.defaultValue,
    ),
    a => a as ValuesFromDefintion<T>,
  ), [fields]);

  const { handleSubmit, control, errors } = useForm<T>({
    defaultValues: defaultValues as UnpackNestedValue<DeepPartial<T>>,
  });

  const submitHandler = useMemo(() => 
    handleSubmit(
      (record: FieldValues) => onSubmit(record as ValuesFromDefintion<T>)
    ),
    [handleSubmit, onSubmit]
  );

  const NumberInput = useCallback(({name, id, config}: {
    name: Key;
    id: string;
    config: NumberValue;
  }) => (
    <Controller
      name={name as string}
      defaultValue={defaultValues[name]}
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
          onBlur={submitOnBlur ? submitHandler : undefined}
          width="100%"
        />
      </>)}
    />
  ), [control, defaultValues, errors, submitHandler, submitOnBlur]);
  const StringInput = useCallback(({name, id, config}: {
    name: Key;
    id: string;
    config: StringValue;
  }) => (
    <Controller
      name={name}
      defaultValue={defaultValues[name]}
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
          onBlur={submitOnBlur ? submitHandler : undefined}
          width="100%"
        />
      </>)}
    />
  ), [control, defaultValues, errors, submitHandler, submitOnBlur]);
  const ListInput = useCallback(({options, name, isRequired = false, isMulti = false}: {
    options: {label: string; value: string | number}[];
    name: Key;
    isMulti?: boolean;
    isRequired?: boolean;
  }) => (
    <Controller
      name={name}
      defaultValue={defaultValues[name]}
      control={control}
      rules={{ required: isRequired }}
      render={({value, onChange}) => (<>
        <Select
          id={`input-${name as string}`}
          value={value}
          theme="neutral"
          onChange={onChange}
          options={options}
          multiple={isMulti}
          width="100%"
        />
      </>)}
    />
  ), [control, defaultValues]);
  const toOptions = useCallback(<T extends PrimitiveValue>({values}: ValueFromList<T> | ValuesFromList<T>): {label: string, value: string | number}[] => values.map((value) => typeof value === 'object'
    ? value
    : {label: `${value}`, value}
  ), []);

  const hasError = Object.keys(errors).length > 0;

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
          .map((fieldName) => `label-${fieldName as string} ${createArray(colSpan, `input-${fieldName as string}`).join(' ')}`)
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
    <form onSubmit={submitHandler}>
      <div
        style={styles}
      >
        {
          entries(fields).map(([name, value]) => (<React.Fragment key={name as string}>
            <Label htmlFor={`input-${name as string}`} gridArea={`label-${name as string}`}>{value.label}</Label>
            <div style={{gridArea: `input-${name as string}`}}>
            {
                isValuesFromList(value)   ? (<ListInput name={name} isMulti={true} options={toOptions(value)} isRequired={value.isRequired} />)
              : isValueFromList(value)    ? (<ListInput name={name} isMulti={false} options={toOptions(value)} isRequired={value.isRequired} />)
              : isStringValue(value)      ? (<StringInput id={`input-${name as string}-${formId}`} name={name} config={value} />)
              : isNumberValue(value)      ? (<NumberInput id={`input-${name as string}-${formId}`} name={name} config={value} />)
              : /* default */               (<></>)
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
        {!submitOnBlur && <Button onClick="submit" disabled={hasError} type="primary">Valider</Button>}
      </div>
    </form>
  );
}