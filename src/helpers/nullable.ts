
export type TypeofDefined<U> = U extends undefined | null ? never : U;
