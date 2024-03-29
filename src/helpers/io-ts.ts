import * as IO from "io-ts";
import * as Record from "fp-ts/Record";

const isTypeC = (value: IO.Mixed): value is IO.TypeC<IO.Props> =>
  "props" in value;
const isIntersectionC = (
  value: IO.Mixed
): value is IO.IntersectionC<[IO.Mixed, IO.Mixed]> => "props" in value;

export const omit = <T extends IO.Mixed, P extends IO.Props, K extends keyof P>(
  type: T,
  key: K
) => {
  const omitFromType = (t: IO.TypeC<IO.Props>) =>
    IO.type(
      Object.entries(t.props)
        .filter(([prop]) => prop !== key)
        .reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: value,
          }),
          {} as Omit<typeof t.props, K>
        )
    );

  if (isTypeC(type)) {
    return omitFromType(type);
  } else if (isIntersectionC(type)) {
    return IO.intersection([type.types[0], type.types[1]]);
  } else {
    return type;
  }
};

/**
 * UnionToIntersection<{ foo: string } | { bar: string }> =
 *  { foo: string } & { bar: string }.
 */
type UnionToIntersection<U> = (
  U extends unknown ? (arg: U) => 0 : never
) extends (arg: infer I) => 0
  ? I
  : never;

/**
 * LastInUnion<1 | 2> = 2.
 */
type LastInUnion<U> = UnionToIntersection<
  U extends unknown ? (x: U) => 0 : never
> extends (x: infer L) => 0
  ? L
  : never;

/**
 * UnionToTuple<1 | 2> = [1, 2].
 */
export type UnionToTuple<U, Last = LastInUnion<U>> = [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, Last>>, Last];

type Values<A extends Record<string | number, unknown>> = A[keyof A];

export const decoderFromReadonlyArray = <A extends string | number>(
  array: Readonly<[A, A, ...A[]]>
) =>
  IO.union(
    array.map((v) => IO.literal(v)) as [
      // union needs at least 2 elements which is already checked by the typing
      IO.LiteralC<A>,
      IO.LiteralC<A>,
      ...[IO.LiteralC<A>]
    ]
  ) as unknown as IO.UnionC<
    // @ts-expect-error the type here is only to make the result type readable
    UnionToTuple<
      Values<{
        [K in A]: IO.LiteralC<K>;
      }>
    >
  >;
