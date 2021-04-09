import * as React from "react";

export function D6({value}: {value: number}) {
  return (
    <svg
      style={{width: '5rem', height: '5rem'}}
      viewBox="0 0 26 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 26H1V7l9.5-6h15v17L19 26z" fill="#5DE6F0" />
      <path d="M1 7h18l6.5-6h-15L1 7z" fill="#8DECF0" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.5 18L19 26V7l6.5-6v17z"
        fill="#03A1B8"
      />
      <path
        d="M1 7h18M1 7v19h18M1 7l9.5-6h15M19 7v19m0-19l6.5-6M19 26l6.5-8V1"
        stroke="#013648"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text  x="5.5" y="19" fontSize="7" fill="black">{`${value}`.padStart(2, '0')}</text>
    </svg>
  );
}
