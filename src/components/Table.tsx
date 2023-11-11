import React from "react";
import * as IO from "io-ts-types";
import * as Either from "fp-ts/Either";
import { pipe, constant } from "fp-ts/lib/function";

type Props = {
  headers: React.ReactNode[];
  values: React.ReactNode[][];
};

const isNumber = (a: unknown) =>
  pipe(
    a,
    IO.IntFromString.decode,
    Either.fold(constant(false), constant(true))
  );

export function Table({ headers, values }: Props) {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={`header_${index}`}
              className="px-1 text-white bg-gray-500 border border-gray-500"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {values.map((value, rowIndex) => (
          <tr key={`row_${rowIndex}`}>
            {value.map((value, coldIndex) => (
              <td
                key={`cell_${rowIndex}_${coldIndex}`}
                className={`px-1 border border-gray-500 ${
                  isNumber(value) ? "text-right" : ""
                }`}
              >
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
