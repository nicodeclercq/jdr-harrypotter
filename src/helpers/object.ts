export const entries = <T extends string | number | symbol, U>(object: Record<T,U>) => Object.entries(object) as [T, U][];

export const remove = <U extends string | number | symbol, V, T extends Record<U, V>>(key: keyof T, object: T): Omit<T, typeof key> => entries(object)
  .reduce((acc, [k, v]) =>
    k === key
      ? acc
      : {acc, [k]: v} as unknown as Omit<T, keyof T>
  ,{} as Omit<T, keyof T>);