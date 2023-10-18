import React from "react";
import { Header } from "./Header";

type Props = {
  children: React.ReactNode,
  useDividers?: boolean,
  title?: React.ReactNode,
  fullWidth?: boolean,
  grow?: boolean,
}

export function Card({ children, title, useDividers = false, fullWidth = false, grow}: Props) {
  const flexGrow = grow != null
    ? grow === true ? "grow" : "grow-0"
    : undefined;

  return (
    <div className={`flex flex-col ${fullWidth ? "w-full" : ""} max-h-full overflow-hidden text-left bg-white rounded-lg shadow shadow-md ${flexGrow}`}>
      {title && <Header>{title}</Header>}
      <div className={`flex-grow ${useDividers ? "divide-y divide-solid overflow-y-auto" : ""}`}>
        {children}
      </div>
    </div>
  );
}