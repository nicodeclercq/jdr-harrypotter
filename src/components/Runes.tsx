import * as React from "react";
import { keys } from "../helpers/object";

export const RUNES = {
  Fehu: '0',
  Ūruz: '1',
  Ūrq: '2',
  Þurisaz: '3',
  Ansuz: '4',
  Raidō: '5',
  Kaunan: '6',
  Kenaz: '7',
  Gebō: '8',
  Wunjō: '9',
  Hagalaz: '10',
  Haglaz: '11',
  Nauđiz: '12',
  Īsaz: '13',
  Īsą: '14',
  Īsan: '15',
  Jēra: '16',
  Jēran: '17',
  Jēraz: '18',
  Ihwaz: '19',
  Eihwaz: '20',
  Perþō: '21',
  Perþaz: '22',
  Algiz: '23',
  Sōwilō: '24',
  Sæwelō: '25',
  Tīwaz: '26',
  Teiwaz: '27',
  Berkanan: '28',
  Ehwaz: '29',
  Mannaz: '30',
  Laguz: '31',
  Laukaz: '32',
  Ingwaz: '33',
  Inguz: '34',
  Dagaz: '35',
  Ōþalan: '36',
  Gizn: '37',
  Bōwaz: '38',
  Kahlan: '39',
  Hieraz: '40',
};

export type RuneName = keyof typeof RUNES;

const runesIndex = keys(RUNES).reduce((acc, cur, index) => ({
  ...acc,
  [cur]: index,
}), {} as Record<RuneName, number>);

type Props = {
  name: RuneName
};

export function Rune({name}: Props) {
  const index = runesIndex[name];  

  return (
    <div className="inline-block">
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 12 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {index === 0 && <path d="M5 15V2L9 6.5" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 1 && <path d="M3 13H12M8 3L3 5.5L8 10.5L12.5 6L8 3Z" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 2 && <path d="M10.5 5L7 1V14.5L4 11" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 3 && <path d="M4 2V6.5M4 14V6.5M10.5 2V9.5M10.5 14V9.5M4 6.5L10.5 9.5" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 4 && <path d="M4 2V5M4 14V8M10.5 2V8M10.5 14V11M4 5V6.5V8M4 5L10.5 8M10.5 8V9.5V11M4 8L10.5 11" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 5 && <path d="M5 1V5M5 15V12M5 5L9.5 8.5L5 12M5 5V12" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 6 && <path d="M4.83333 5.25L9.83333 11.75M4.83333 5.25L3 8V9.6L4.83333 11.25M4.83333 5.25L6.33333 4H8.21569L9.83333 5.75M9.83333 11.75L11.451 10.6176V8.5L9.83333 5.75M9.83333 11.75L8.21569 12.8824L6.46658 12.7199L4.83333 11.25M9.83333 5.75L4.83333 11.25" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 7 && <path d="M3 14V9M11.5 9L3 3V9M11.5 9V3L3 9M11.5 9V14" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 8 && <path d="M10.5 2L4 8L10.5 14" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 9 && <path d="M3 14V3L7.5 7L11.5 3V14" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 10 && <path d="M7 7V8.5L6.5 7.5L8 8M7 3L2 5.5L7 13L12 10.5L7 3Z" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 11 && <path d="M8 14V2M5 3L10.5 8.5" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 12 && <path d="M7.5 2V14M2.5 9.5L13.5 8M1 4L10 12.25M12 4L3 14.5" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 13 && <path d="M7 2V14.5" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 14 && <path d="M5 2V5.5M5 14V9M5 9L9.5 6M5 9V5.5M5 5.5L9.5 2" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 15 && <path d="M4 4L11.5 6L7.5 8V13" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 16 && <path d="M3 3L11.5 12.5V3L3 12.5V3Z" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 17 && <path d="M5 8V1L10.5 4.5L5 8ZM5 8V15L10.5 11L5 8Z" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 18 && <path d="M2 5.5L7 3L12 10.5L7 13L2 5.5Z" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 19 && <path d="M4 2L9.5 8L4 13.5M9.5 2L4 8L10 13.5" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 20 && <path d="M4 15V10M4 10V1L10 7L4 10ZM4 10L10 15" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 21 && <path d="M3 3L11 13M11 3L3 13" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 22 && <path d="M7.5 1V5M7.5 15V12M7.5 5L12 8.5L7.5 12M7.5 5V12M7.5 5L3 8.5L7.5 12" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 23 && <path d="M4 6L7.5 2M7.5 2L11 6M7.5 2V15" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 24 && <path d="M5 14V11M10 6.5L5 2V6.5M10 6.5L5 11M10 6.5H5M5 11V6.5" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 25 && <path d="M4 14V3L11 7V14" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 26 && <path d="M5 15V10M5 10V2L10 6.5L5 10Z" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 27 && <path d="M7.5 2V6M7.5 15V6M11 2L7.5 6M7.5 6L4 2" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 28 && <path d="M10 3L4 8H11L5 14" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 29 && <path d="M5 2V5M5 15V11.5M5 11.5L10 8.5M5 11.5V8.5M10 8.5L5 5M10 8.5H5M5 5V8.5" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 30 && <path d="M7.50006 4V13M11.0001 4L7.50006 13M7.50006 13L4.00006 4" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 31 && <path d="M11.0001 2L4.00006 8L11.0001 14H4.00006" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 32 && <path d="M4.50006 2L11.0001 8M11.0001 8L4.50006 14M11.0001 8V2V14" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 33 && <path d="M11.0001 2L4.00006 8L7.50006 11M11.0001 14L7.50006 11M7.50006 11L10.0001 9" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 34 && <path d="M5.00006 15V8M10.0001 7L5.00006 1V8M5.00006 8L10.0001 12.5" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 35 && <path d="M5.00006 14L11.0001 6L7.50006 2L4.00006 6L10.0001 14" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 36 && <path d="M7.00006 5L3.00006 9L8.00006 14M8.00006 2L12.0001 5L8.00006 10" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 37 && <path d="M11.0001 3L8.00006 5L4.00006 2V14L8.00006 11L11.0001 14" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 38 && <path d="M5.00006 3V7.75M5.00006 12.5V7.75M5.00006 7.75L10.0001 12.5" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 39 && <path d="M9.00006 3L6.00006 5.5L9.00006 8.5L6.00006 10.5L9.00006 13" stroke="currentColor" strokeLinejoin="bevel"/>}
        {index === 40 && <path d="M3.00006 8L6.95099 3.5L8.97552 3.25M11.0001 3L8.97552 3.25M8.97552 3.25L8.54913 13.5" stroke="currentColor" strokeLinejoin="bevel"/>}
      </svg>
    </div>
  );
}

