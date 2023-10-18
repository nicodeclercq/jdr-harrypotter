import React from "react";

type Props = {
  isVertical?: boolean;
};

export function Separator({ isVertical = false }: Props) {
  return (
    <hr
      className="bg-gray-500"
      style={{
        width: isVertical ? "1.5px" : "100%",
        height: isVertical ? "100%" : "1.5px",
        minHeight: isVertical ? "1em" : "1px",
        border: "none",
        background: "currentColor",
        margin: isVertical ? "0 0.25rem" : "0.25rem 0",
        display: isVertical ? "inline-block" : "block",
      }}
    />
  );
}
