import React from "react";

export function Comment({children}: {children: React.ReactNode}) {
  return (
    <span className="text-sm font-light text-gray-500">{children}</span>
  );
}