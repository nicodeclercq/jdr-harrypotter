import React from "react";
import { Icon, IconName } from "./icons/Icon";

type Props = {
  onClick: "submit" | (() => void);
  icon: IconName;
  disabled?: boolean;
  title?: string;
};

export function ButtonIcon({ onClick, title, icon, disabled = false }: Props) {
  const isSubmit = onClick === "submit";
  const rest = (isSubmit ? {} : { onClick }) as { onClick?: () => void };

  return (
    <button
      title={title}
      {...rest}
      type={isSubmit ? "submit" : "button"}
      disabled={disabled}
      className={`${
        disabled ? "opacity-50 cursor-not-allowed" : "opacity-100"
      } inline-flex justify-center align-center rounded py-1 px-2 text-s bg-white ${
        disabled ? "" : "hover:bg-blue-100"
      } text-blue-700`}
    >
      <Icon name={icon} />
    </button>
  );
}
