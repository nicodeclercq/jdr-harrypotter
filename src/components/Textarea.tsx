import React, { TextareaHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { getColor } from "../theme";
import { ErrorMessage } from "./ErrorMessage";

type Props= {
  theme: "base" | "neutral";
  errors?: FieldError;
  messages?: Record<string, string>;
  onChange: (value: string) => void;
}

export function Textarea ({onChange, theme, errors, disabled, messages, ...rest}: Props & Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "className" | "style" | "onChange"
>) {
  const styles = {
    base: `${getColor("primary", 200, "ring")} px-1 border ${getColor("primary", 700, "border")}  rounded ${getColor("primary", 800, "placeholder")} ${getColor("primary", 900, "foreground")} ${getColor("primary", 500)} bg-opacity-50`,
    neutral: "ring-gray-200 px-1 border border-gray-500 rounded placeholder-gray-600 text-gray-900 bg-gray-200 bg-opacity-50",
    invalid: "ring-red-200 px-1 border border-red-500 rounded placeholder-red-600 text-red-900 bg-red-200 bg-opacity-50",
    disabled: "px-1 rounded bg-white bg-opacity-0",
  };

  return (
    <div className="inline-flex flex-col w-full">
      <textarea
        {...rest}
        disabled={disabled}
        className={`w-full max-w-full focus:ring-4 ${
          errors ? styles.invalid
            : disabled ? styles.disabled
              : styles[theme]}`
        }
        onChange={e => {
          onChange(e.target.value);
        }}
        style={{minHeight: "10rem"}}
      />
      {errors && <ErrorMessage errors={errors} messages={messages} />}
    </div>
  );
}