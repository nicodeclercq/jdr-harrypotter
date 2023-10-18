import { getColor } from "../theme";

type MultiOnchange = <T>(value: T[]) => void;
type SingleOnchange = <T>(value: T) => void;

type BaseProps<T extends string> = {
  id?: string;
  options: { label: string; value: T }[];
  value?: T;
  width?: string;
  theme?: "base" | "neutral";
};
type MultipleValuesProps = {
  multiple: true;
  onChange: MultiOnchange;
};
type SingleValueProps = {
  multiple?: false;
  onChange: SingleOnchange;
};
type Props<T extends string> = BaseProps<T> &
  (MultipleValuesProps | SingleValueProps);

const isMulti = <T extends string>(
  props: Props<T>
): props is BaseProps<T> & MultipleValuesProps => props.multiple === true;

export function Select<T extends string>(props: Props<T>) {
  const {
    id,
    onChange,
    options,
    value,
    width,
    theme = "base",
    multiple = false,
  } = props;
  const styles: Record<"base" | "neutral", string> = {
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
    <select
      id={id}
      className={`focus:ring-4 ${multiple ? "" : "h-7"} ${styles[theme]}`}
      onChange={(e) => {
        if (!isMulti(props)) {
          return (onChange as SingleOnchange)(e.target.value as T);
        }

        const values = Array.from(
          e.target.querySelectorAll("option:checked")
        ).map((option) => (option as HTMLOptionElement).value as T);
        (onChange as MultiOnchange)(values);
      }}
      value={value}
      multiple={multiple}
      style={width ? { width } : {}}
    >
      {options.map(({ value, label }) => (
        <option key={`${label}_${value}`} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
