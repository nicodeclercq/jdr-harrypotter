export const isDefined = <T>(value: T): value is TypeofDefined<T> =>  value != null;
export type TypeofDefined<U> = U extends undefined | null ? never : U;
