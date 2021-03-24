import * as IO from 'io-ts';

export type Target = 'Animal' | 'Object' | 'Person' | 'Plant';
export type Element = 'Feu' | 'Air' | 'Eau' | 'Terre' | 'Âme' | 'Corps';

export type Spell = {
  name: string;
  incantation: string;
  description: string;
  targets: {
    [key in Target]: boolean;
  };
  level: number;
  primaryElement: Element;
  secondaryElement: Element;
};

export type State = {
  userSpells: Spell[],
  uses: Record<string, number>,
};
export const defaultState: State = {
  userSpells: [],
  uses: {},
};

export const elementDecoder = IO.union([
  IO.literal('Air'),
  IO.literal('Eau'),
  IO.literal('Terre'),
  IO.literal('Feu'),
  IO.literal('Âme'),
  IO.literal('Corps'),
]);
export const spellDecoder = IO.strict({
  name: IO.string,
  incantation: IO.string,
  description: IO.string,
  targets: IO.strict({
    Animal: IO.boolean,
    Object: IO.boolean, 
    Person: IO.boolean,
    Plant: IO.boolean,
  }),
  level: IO.number,
  primaryElement: elementDecoder,
  secondaryElement: elementDecoder,
});
export const stateDecoder = IO.strict({
  userSpells: IO.array(spellDecoder),
  uses: IO.record(IO.string, IO.number),
});

function update(_currentState: unknown): Promise<State> {
  return Promise.resolve(defaultState)
}

export function retrieve(currentState: unknown): Promise<State> {
  return stateDecoder.is(currentState)
    ? Promise.resolve(currentState)
    : update(currentState);
}