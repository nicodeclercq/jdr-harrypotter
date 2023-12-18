export type EmptyObject = Record<string, never>;

export const hasKey = <T extends string | number | symbol, U>(
  name: string | number | symbol,
  object: Record<T, U>
): name is T => name in object;

export const entries = <T extends string | number | symbol, U>(
  object: Record<T, U>
) => Object.entries(object) as [T, U][];

export const keys = <T extends string | number | symbol>(
  object: Record<T, unknown>
) => Object.keys(object) as T[];

export const values = <T extends string | number | symbol, U>(
  object: Record<T, U>
) => Object.values(object) as U[];

export const remove = <
  U extends string | number | symbol,
  V,
  T extends Record<U, V>
>(
  key: keyof T,
  object: T
): Omit<T, typeof key> =>
  entries(object).reduce(
    (acc, [k, v]) =>
      k === key ? acc : ({ ...acc, [k]: v } as Omit<T, keyof T>),
    {} as Omit<T, keyof T>
  );

export const merge = <T, U extends string | number | symbol>(
  obj1: Record<U, T>,
  obj2: Record<U, T>,
  concat: (a: T, b: T) => T
) => {
  return entries(obj1).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: concat(acc[key], value),
    }),
    obj2
  );
};

export const map = <K extends string | number | symbol, A, B>(
  fn: (a: A, key: K, obj: Record<K, A>) => B,
  obj: Record<K, A>
) => {
  return entries(obj).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: fn(value, key, obj),
    }),
    {} as Record<K, B>
  );
};

export const emptyRecord = <A extends string | number | symbol, B>() =>
  ({} as Record<A, B>);

export const fromEntries = <A extends string | number | symbol, B>(
  entries: [A, B][]
) =>
  entries.reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    emptyRecord<A, B>()
  );

export type ValueOf<T extends Record<string | number | symbol, unknown>> =
  T extends Record<string | number | symbol, infer R> ? R : never;
export type KeyOf<T extends Record<string | number | symbol, unknown>> =
  keyof T;
export type Lens<O, K> = {
  get: (o: O) => K;
  set: (o: O, newValue: K) => O;
};

export const getProperty = <T, K extends keyof T>(o: T, propertyName: K) =>
  o[propertyName];
export const getPropertyCurried =
  <T, K extends keyof T>(propertyName: K) =>
  (o: T) =>
    getProperty(o, propertyName);
export const setProperty =
  <T, K extends keyof T>(o: T, propertyName: K) =>
  (newValue: T[K]) => ({
    ...o,
    [propertyName]: newValue,
  });

export const lensProperty = <T, K extends keyof T>(propertyName: K) =>
  ({
    get: (o: T) => getProperty(o, propertyName),
    set: (o: T, newValue: T[K]) => setProperty(o, propertyName)(newValue),
  } as const);

type Path<T> = T extends object
  ? {
      [K in keyof T]:
        | [Exclude<K, symbol>]
        | [Exclude<K, symbol>, ...Path<T[K]>];
    }[keyof T]
  : never;

type ValueAtPath<P extends Path<O>, O> = [] extends P
  ? O
  : P extends [infer First extends keyof O, ...infer Others]
  ? Others extends []
    ? O[First]
    : Others extends Path<O[First]>
    ? ValueAtPath<Others, O[First]>
    : never
  : never;

export const lensPath = <T, P extends Path<T>>(path: P) => {
  return {
    get: (o: T): ValueAtPath<P, T> =>
      // @ts-ignore too much boilerplate to explain to typescript here
      path.reduce((acc, cur) => getProperty(acc, cur), o),
    set: (o: T, newValue: ValueAtPath<P, T>) => {
      const setToPath = (oTmp: T, p: Path<T>): T => {
        const [firstProp, ...otherProps] = p as [keyof T, ...Path<T>];

        return otherProps.length === 0
          ? // @ts-ignore too much boilerplate to explain to typescript here
            setProperty(oTmp, firstProp)(newValue)
          : // @ts-ignore too much boilerplate to explain to typescript here
            { ...oTmp, [p[0]]: setToPath(oTmp[firstProp], otherProps) };
      };
      return setToPath(o, path);
    },
  } as const;
};

export const combineLens = <T, U, V>(lens1: Lens<T, U>, lens2: Lens<U, V>) =>
  ({
    get: (o: T) => lens2.get(lens1.get(o)),
    set: (o: T, newValue: V) => lens1.set(o, lens2.set(lens1.get(o), newValue)),
  } as const);

export const createLens = <T>() => ({
  get: (t: T) => t,
  set: (_t: T, newValue: T) => newValue,
  fromProperty: <K extends keyof T>(propertyName: K) =>
    lensProperty<T, K>(propertyName),
  fromPath: <P extends Path<T>>(path: P) => lensPath<T, P>(path),
});
