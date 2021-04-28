export const entries = <T extends string | number | symbol, U>(object: Record<T,U>) => Object.entries(object) as [T, U][];

export const keys = <T extends string | number | symbol>(object: Record<T, unknown>) => Object.keys(object) as T[];

export const remove = <U extends string | number | symbol, V, T extends Record<U, V>>(key: keyof T, object: T): Omit<T, typeof key> => entries(object)
  .reduce((acc, [k, v]) =>
    k === key
      ? acc
      : {...acc, [k]: v} as Omit<T, keyof T>
  ,{} as Omit<T, keyof T>);

export const merge = <T, U extends string | number | symbol>(obj1: Record<U, T>, obj2: Record<U, T>, concat: (a: T, b: T) => T) => {
  return entries(obj1)
    .reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: concat(acc[key], value)
      }),
      obj2
    );
}

export const map = <K extends string | number | symbol, A, B>(fn: (a: A) => B, obj: Record<K, A>) => {
  return entries(obj)
    .reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: fn(value),
      }),
      {} as Record<K, B>
    )
}