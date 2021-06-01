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
