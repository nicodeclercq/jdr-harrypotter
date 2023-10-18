import { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { getColor } from "../theme";
import { ErrorMessage } from "./ErrorMessage";
import { Label } from "./font/Label";
let id = 0;
const uuid = () => `checkbox_${id++}`;

type Props = {
  label: string;
  onChange: (value: boolean) => void;
  theme: "base" | "neutral";
  errors?: FieldError;
  messages?: Record<string, string>;
};

export function Checkbox({
  label,
  onChange,
  theme,
  errors,
  messages,
  ...rest
}: Props &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "className" | "style" | "onChange"
  >) {
  const id = uuid();
  const styles = {
    base: `${getColor("primary", 200, "ring")} px-1 border ${getColor(
      "primary",
      700,
      "border"
    )}  rounded ${getColor("primary", 800, "placeholder")} ${getColor(
      "primary",
      900,
      "foreground"
    )} ${getColor("primary", 500)} bg-opacity-50`,
    neutral:
      "ring-gray-200 px-1 border border-gray-500 rounded placeholder-gray-600 text-gray-900 bg-gray-200 bg-opacity-50",
  };

  return (
    <div className="inline-flex flex-row">
      <input
        id={id}
        {...rest}
        type="checkbox"
        className={`focus:ring-4 ${styles[theme]}`}
        onChange={(e) => onChange(e.target.checked)}
      />
      <Label htmlFor={id}>{label}</Label>
      {errors && <ErrorMessage errors={errors} messages={messages} />}
    </div>
  );
}
