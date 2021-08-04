import { useState } from 'react';

const defaultEquals = <T>(a: T, b: T) => a === b;

export function useDistinct<T>(equals: (a: T, b: T) => boolean = defaultEquals) {
  const [value, setValue] = useState<T | undefined>();

  return (currentValue: T) => {
    if(value !== undefined && equals(value, currentValue)){
      return value;
    }

    setValue(currentValue);
    return currentValue;
  }
}