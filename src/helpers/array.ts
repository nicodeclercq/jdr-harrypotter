import { random } from "./number";

export type TypeofItems<U extends unknown[]> = U extends (infer R)[] ? R : never;

// @ts-ignore
export const removeDupplicates = <T>(arr: T[]): T[] => [...(new Set(arr))];

export const getDupplicates = <T>(arr: T[]): T[] => {
  const items = [] as T[];
  const dupplicates = [] as T[];
  arr.forEach(a => {
    if(items.includes(a)) {
      dupplicates.push(a);
    } else {
      items.push(a);
    }
  })
  return dupplicates;
}

export const findLastIndex = <T>(predicate: (a: T) => boolean ,arr: T[]): number =>
  arr.length - 1 - arr.reverse().findIndex(predicate);

export const getNRandomIndexFromFilteredArray = <T>(number: number, predicate: (a: T, index: number) => boolean ,arr: T[]): Array<number | undefined> => {
  const indexes = arr
    .map((value, index) => ({value, index}))
    .filter(({value, index}) => predicate(value, index))
    .map(({index}) => index);

  if(number === 0){
    return [];
  }
  if(number >= indexes.length) {
    return new Array(number)
      .fill(0)
      .map((_, i) => i < indexes.length ? indexes[i] : undefined);
  }
  
  const randomIndex = random(0, indexes.length - 1);
  return [indexes[randomIndex], ...getNRandomIndexFromFilteredArray(number - 1, (a: T, index: number) => index !== randomIndex && predicate(a, index), arr)];
}

export const getNRandomFromArray = <T>(number: number, arr: T[]): Array<T> => {
  if(number === 0 || arr.length === 0){
    return [];
  }
  if(number >= arr.length) {
    return new Array(number)
      .fill(0)
      .map((_, i) => arr[i]);
  }
  
  const randomIndex = random(0, arr.length - 1);
  return [arr[randomIndex], ...getNRandomFromArray(number - 1, arr.filter((_, i) => i !== randomIndex))];
}

export const createArrayOfIndex = (size: number) => new Array(size)
  .fill(0).map((v, index) => index);

export const createArray = <T>(size: number, defaultValue: T) => new Array(size)
  .fill(defaultValue);