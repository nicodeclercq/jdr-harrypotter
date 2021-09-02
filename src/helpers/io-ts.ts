import * as IO from 'io-ts';

const isTypeC = (value: IO.Mixed): value is IO.TypeC<IO.Props> => 'props' in value;
const isIntersectionC = (value: IO.Mixed): value is IO.IntersectionC<[IO.Mixed, IO.Mixed]> => 'props' in value;

export const omit = <T extends IO.Mixed, P extends IO.Props, K extends keyof P>(type: T, key: K) => {
  const omitFromType = (t: IO.TypeC<IO.Props>) => IO.type(
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
    return IO.intersection([
      type.types[0],
      type.types[1],
    ]);
  } else {
    return type;
  }
}
