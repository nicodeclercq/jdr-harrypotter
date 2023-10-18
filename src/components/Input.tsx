import React, { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { getColor } from "../theme";
import { ErrorMessage } from "./ErrorMessage";

type NumberInputProps = {
  onChange: (value: number | undefined) => void;
  type: "number" | "range";
}
type OtherInputProps = {
  onChange: (value: string) => void;
  type: "color" | "date" | "datetime-local" | "email" | "file" | "image" | "month" | "password" | "search" | "tel" | "text" | "time" | "url" | "week";
}

const isNumberInputProps = (args: NumberInputProps | OtherInputProps): args is NumberInputProps => args.type === "number" || args.type === "range";

type Props= (NumberInputProps | OtherInputProps) & {
  theme: "base" | "neutral";
  errors?: FieldError;
  messages?: Record<string, string>;
  width?: string;
}

export function Input ({onChange, type, theme, errors, disabled, messages, value, width, ...rest}: Props & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "style" | "onChange"
>) {
  const styles = {
    base: `${getColor("primary", 200, "ring")} px-1 border ${getColor("primary", 700, "border")}  rounded ${getColor("primary", 800, "placeholder")} ${getColor("primary", 900, "foreground")} ${getColor("primary", 500)} bg-opacity-50`,
    neutral: "ring-gray-200 px-1 border border-gray-500 rounded placeholder-gray-600 text-gray-900 bg-gray-200 bg-opacity-50",
    invalid: "ring-red-200 px-1 border border-red-500 rounded placeholder-red-600 text-red-900 bg-red-200 bg-opacity-50",
    disabled: "px-1 rounded bg-white bg-opacity-0 overflow-ellipsis",
  };

  return (
    <div className="inline-flex flex-col" style={width ? {width} : {width: "min-content", minWidth: "10rem", maxWidth: "100%"}}>
      <input
        {...rest}
        defaultValue={value}
        disabled={disabled}
        type={type}
        className={`w-full focus:ring-4 h-7 ${
          errors ? styles.invalid
            : disabled ? styles.disabled
              : styles[theme]}`
        }
        onChange={e => {
          const value = e.target.value;
          const props = {onChange, type} as NumberInputProps | OtherInputProps;
          if(isNumberInputProps(props)){
            try{
              props.onChange(parseInt(value, 10));
            } catch {
              props.onChange(undefined);
            }
          }else{
            props.onChange(value);
          }
        }}
        style={width ? {minWidth: width} : {minWidth: "5rem"}}
      />
      {errors && <ErrorMessage errors={errors} messages={messages} />}
    </div>
  );
}