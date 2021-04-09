import React from 'react';

export function D10({value}: {value: number}) {
  return (
    <svg
      style={{width: '6rem', height: '6rem'}}
      viewBox="0 0 33 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 1l15.514 11.635a1 1 0 01.386.965l-.9 5.4-15 11-15-11-.455-5.459a1 1 0 01.384-.873L16.5 1z"
        fill="#0EB4C4"
      />
      <path
        d="M18.091 28.833l12.132-8.897a1 1 0 00-.117-1.687l-4.662-2.51a1 1 0 00-.9-.024l-7.47 3.515a1 1 0 00-.574.905v7.892a1 1 0 001.591.806z"
        fill="#02505D"
        fillOpacity={0.75}
      />
      <path
        d="M16.5 20.135v7.892a1 1 0 01-1.591.806L2.777 19.936a1 1 0 01.117-1.687l4.662-2.51a1 1 0 01.9-.024l7.47 3.515a1 1 0 01.574.905z"
        fill="#0686A1"
        fillOpacity={0.75}
      />
      <path
        d="M32.014 12.635L20.476 3.982c-.873-.655-2.014.364-1.462 1.306l5.844 9.97c.093.158.227.288.389.375l5.022 2.704a1 1 0 001.46-.716L32.4 13.6a1 1 0 00-.386-.965z"
        fill="#009BB4"
        fillOpacity={0.75}
      />
      <path
        d="M24.01 15.966L16.925 19.3a1 1 0 01-.852 0l-7.083-3.334a1 1 0 01-.437-1.41l7.083-12.084a1 1 0 011.726 0l7.083 12.084a1 1 0 01-.437 1.41z"
        fill="#78F7FF"
        fillOpacity={0.75}
      />
      <path
        d="M1 13L16.5 1 8 15.5 1.5 19 1 13z"
        fill="#B8FFFF"
        fillOpacity={0.75}
      />
      <path
        d="M16.5 1l15.514 11.635a1 1 0 01.386.965l-.9 5.4m-15-18L25 15.5M16.5 1L1.43 12.668a1 1 0 00-.385.873L1.5 19m15-18L8 15.5M31.5 19l-15 11m15-11L25 15.5M16.5 30V19.5m0 10.5l-15-11m15 .5l8.5-4m-8.5 4l-8.5-4M1.5 19L8 15.5"
        stroke="#024A6B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 1l15.514 11.635a1 1 0 01.386.965l-.9 5.4m-15-18L25 15.5M16.5 1L1.43 12.668a1 1 0 00-.385.873L1.5 19m15-18L8 15.5M31.5 19l-15 11m15-11L25 15.5M16.5 30V19.5m0 10.5l-15-11m15 .5l8.5-4m-8.5 4l-8.5-4M1.5 19L8 15.5"
        stroke="url(#prefix__paint0_linear)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text  x="14.5" y="15" fontSize="7" fill="black">{value}</text>
      <defs>
        <linearGradient
          id="prefix__paint0_linear"
          x1={16.75}
          y1={1}
          x2={16.75}
          y2={30}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00354C" />
          <stop offset={1} stopColor="#003745" />
        </linearGradient>
      </defs>
    </svg>
  );
}
