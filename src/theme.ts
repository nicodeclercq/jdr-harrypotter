type Level = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type Color = "primary" | "secondary";
type Type =
  | "foreground"
  | "background"
  | "ring"
  | "border"
  | "placeholder"
  | "hover:background"
  | "from:background"
  | "to:background";

const defs = {
  primary: {
    border: {
      50: "border-yellow-50",
      100: "border-yellow-100",
      200: "border-yellow-200",
      300: "border-yellow-300",
      400: "border-yellow-400",
      500: "border-yellow-500",
      600: "border-yellow-600",
      700: "border-yellow-700",
      800: "border-yellow-800",
      900: "border-yellow-900",
    },
    placeholder: {
      50: "border-yellow-50",
      100: "border-yellow-100",
      200: "border-yellow-200",
      300: "border-yellow-300",
      400: "border-yellow-400",
      500: "border-yellow-500",
      600: "border-yellow-600",
      700: "border-yellow-700",
      800: "border-yellow-800",
      900: "border-yellow-900",
    },
    ring: {
      50: "ring-yellow-50",
      100: "ring-yellow-100",
      200: "ring-yellow-200",
      300: "ring-yellow-300",
      400: "ring-yellow-400",
      500: "ring-yellow-500",
      600: "ring-yellow-600",
      700: "ring-yellow-700",
      800: "ring-yellow-800",
      900: "ring-yellow-900",
    },
    foreground: {
      50: "text-yellow-50",
      100: "text-yellow-100",
      200: "text-yellow-200",
      300: "text-yellow-300",
      400: "text-yellow-400",
      500: "text-yellow-500",
      600: "text-yellow-600",
      700: "text-yellow-700",
      800: "text-yellow-800",
      900: "text-yellow-900",
    },
    background: {
      50: "bg-yellow-50",
      100: "bg-yellow-100",
      200: "bg-yellow-200",
      300: "bg-yellow-300",
      400: "bg-yellow-400",
      500: "bg-yellow-500",
      600: "bg-yellow-600",
      700: "bg-yellow-700",
      800: "bg-yellow-800",
      900: "bg-yellow-900",
    },
    "hover:background": {
      50: "hover:bg-yellow-50",
      100: "hover:bg-yellow-100",
      200: "hover:bg-yellow-200",
      300: "hover:bg-yellow-300",
      400: "hover:bg-yellow-400",
      500: "hover:bg-yellow-500",
      600: "hover:bg-yellow-600",
      700: "hover:bg-yellow-700",
      800: "hover:bg-yellow-800",
      900: "hover:bg-yellow-900",
    },
    "from:background": {
      50: "from-yellow-50",
      100: "from-yellow-100",
      200: "from-yellow-200",
      300: "from-yellow-300",
      400: "from-yellow-400",
      500: "from-yellow-500",
      600: "from-yellow-600",
      700: "from-yellow-700",
      800: "from-yellow-800",
      900: "from-yellow-900",
    },
    "to:background": {
      50: "to-yellow-50",
      100: "to-yellow-100",
      200: "to-yellow-200",
      300: "to-yellow-300",
      400: "to-yellow-400",
      500: "to-yellow-500",
      600: "to-yellow-600",
      700: "to-yellow-700",
      800: "to-yellow-800",
      900: "to-yellow-900",
    },
  },
  secondary: {
    border: {
      50: "border-blue-50",
      100: "border-blue-100",
      200: "border-blue-200",
      300: "border-blue-300",
      400: "border-blue-400",
      500: "border-blue-500",
      600: "border-blue-600",
      700: "border-blue-700",
      800: "border-blue-800",
      900: "border-blue-900",
    },
    placeholder: {
      50: "border-blue-50",
      100: "border-blue-100",
      200: "border-blue-200",
      300: "border-blue-300",
      400: "border-blue-400",
      500: "border-blue-500",
      600: "border-blue-600",
      700: "border-blue-700",
      800: "border-blue-800",
      900: "border-blue-900",
    },
    ring: {
      50: "ring-blue-50",
      100: "ring-blue-100",
      200: "ring-blue-200",
      300: "ring-blue-300",
      400: "ring-blue-400",
      500: "ring-blue-500",
      600: "ring-blue-600",
      700: "ring-blue-700",
      800: "ring-blue-800",
      900: "ring-blue-900",
    },
    foreground: {
      50: "text-blue-50",
      100: "text-blue-100",
      200: "text-blue-200",
      300: "text-blue-300",
      400: "text-blue-400",
      500: "text-blue-500",
      600: "text-blue-600",
      700: "text-blue-700",
      800: "text-blue-800",
      900: "text-blue-900",
    },
    background: {
      50: "bg-blue-50",
      100: "bg-blue-100",
      200: "bg-blue-200",
      300: "bg-blue-300",
      400: "bg-blue-400",
      500: "bg-blue-500",
      600: "bg-blue-600",
      700: "bg-blue-700",
      800: "bg-blue-800",
      900: "bg-blue-900",
    },
    "hover:background": {
      50: "hover:bg-blue-50",
      100: "hover:bg-blue-100",
      200: "hover:bg-blue-200",
      300: "hover:bg-blue-300",
      400: "hover:bg-blue-400",
      500: "hover:bg-blue-500",
      600: "hover:bg-blue-600",
      700: "hover:bg-blue-700",
      800: "hover:bg-blue-800",
      900: "hover:bg-blue-900",
    },
    "from:background": {
      50: "from-blue-50",
      100: "from-blue-100",
      200: "from-blue-200",
      300: "from-blue-300",
      400: "from-blue-400",
      500: "from-blue-500",
      600: "from-blue-600",
      700: "from-blue-700",
      800: "from-blue-800",
      900: "from-blue-900",
    },
    "to:background": {
      50: "to-blue-50",
      100: "to-blue-100",
      200: "to-blue-200",
      300: "to-blue-300",
      400: "to-blue-400",
      500: "to-blue-500",
      600: "to-blue-600",
      700: "to-blue-700",
      800: "to-blue-800",
      900: "to-blue-900",
    },
  },
} as const;

export const getColor = (
  color: Color,
  level: Level,
  type: Type = "background"
) => {
  return defs[color][type][level];
};
