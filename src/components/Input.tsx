import React, { InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';
import { getColor } from '../theme';
import { ErrorMessage } from './ErrorMessage';

type NumberInputProps = {
  onChange: (value: number) => void;
  type: 'number' | 'range';
}
type OtherInputProps = {
  onChange: (value: string) => void;
  type: 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'image' | 'month' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week';
}

const isNumberInputProps = (args: NumberInputProps | OtherInputProps): args is NumberInputProps => args.type === 'number' || args.type === 'range';

type Props= (NumberInputProps | OtherInputProps) & {
  theme: 'base' | 'neutral';
  errors?: FieldError;
  messages?: Record<string, string>;
  width?: string;
}

export function Input ({onChange, type, theme,errors, messages, width, ...rest}: Props & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'style' | 'onChange'
>) {
  const styles = {
    base: `${getColor('primary', 200, 'ring')} px-1 border ${getColor('primary', 700, 'border')}  rounded ${getColor('primary', 800, 'placeholder')} ${getColor('primary', 900, 'foreground')} ${getColor('primary', 500)} bg-opacity-50`,
    neutral: 'ring-gray-200 px-1 border border-gray-500 rounded placeholder-gray-600 text-gray-900 bg-gray-200 bg-opacity-50'
  }

  return (
    <div className="inline-flex flex-col">
      <input
        {...rest}
        type={type}
        className={`focus:ring-4 ${styles[theme]}`}
        onChange={e => {
          const value = e.target.value;
          const props = {onChange, type} as NumberInputProps | OtherInputProps;
          if(isNumberInputProps(props)){
            props.onChange(parseInt(value, 10));
          }else{
            props.onChange(value);
          }
        }}
        style={width ? {width} : {}}
      />
      {errors && <ErrorMessage errors={errors} messages={messages} />}
    </div>
  );
};