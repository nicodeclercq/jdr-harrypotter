import React from "react";

export function D20({value, size = 6}: {value: number, size?: number}) {
  return (
    <svg
      style={{width: `${size}rem`, height: `${size}rem`}}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M43 139L256 7l212 132v229.5L256 504 43 368.5V139z" fill="#000" />
      <path
        d="M67.96 373.799l53.84-4.9 87 95-65.1-41.7-11.5-7.3-64.24-41.1z"
        fill="#3F8FA7"
      />
      <path d="M143.2 368.6L256 491.7l112.8-123.1H143.2z" fill="#3B7C8A" />
      <path d="M270.1 144.899l115.3 197 71.2-192.9-186.5-4.1z" fill="#469FB5" />
      <path d="M256 152.399l-117.1 200.2h234.2L256 152.399z" fill="#83E3EE" />
      <path d="M52 186v173.2l61.9-5.7L52 186z" fill="#89D5D9" />
      <path
        d="M241.9 144.899l-186.51 4.1 71.21 192.9 115.3-197zM248 20.3L72.33 132.6 248 128.8V20.3z"
        fill="#A2EAEE"
      />
      <path d="M264 20.3v108.5l175.7 3.8L264 20.3z" fill="#61BAD0" />
      <path
        d="M347.8 415.2l42.4-46.3 53.8 4.9-54.5 34.9-11.8 7.6-74.5 47.6 40.3-44 4.3-4.7z"
        fill="#2C6875"
      />
      <path d="M460 186l-61.9 167.5 61.9 5.7V186z" fill="#469FB5" />
      <text  x="205" y="320" fontSize="90" fill="black">{value}</text>
    </svg>
  );
}
