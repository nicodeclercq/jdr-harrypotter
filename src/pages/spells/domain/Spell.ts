import { pipe } from 'fp-ts/lib/function';
import * as Ord from 'fp-ts/Ord';

export type Target = 'Animal' | 'Object' | 'Person' | 'Plant';

export type Element = 'Feu' | 'Air' | 'Eau' | 'Terre' | 'Âme' | 'Corps';

export type Spell = {
  id: number,
  name: string;
  incantation: string;
  description: string;
  modifiers: {
    primary: [number, number];
    secondary: [number, number];
  };
  targets: {
    [key in Target]: boolean;
  };
  level: number;
  primaryElement: Element;
  secondaryElement: Element;
};

const get = <T extends keyof Spell>(key: T) => (spell: Spell) =>  spell[key];

export const byLevel = pipe(
  Ord.ordNumber,
  Ord.contramap(get('level'))
);
export const byIncantation = pipe(
  Ord.ordString,
  Ord.contramap(get('incantation'))
);
export const byName = pipe(
  Ord.ordString,
  Ord.contramap(get('name'))
);
export const byPrimaryElement = pipe(
  Ord.ordString,
  Ord.contramap(get('primaryElement'))
);
export const bySecondaryElement = pipe(
  Ord.ordString,
  Ord.contramap(get('secondaryElement'))
);

export const getSpellCost = ({level, primaryElement, secondaryElement, modifiers:{primary: [first, second]}}: Spell) => {
  const elementFactor = (element: Element) => element === 'Âme' || element === 'Corps'
    ? 2
    : 1;

  return {
    primary: ((level+1)**2) * elementFactor(primaryElement) * 5 + first,
    secondary: ((level+1)**2) * elementFactor(secondaryElement) * 5 + second,
  }
};

export const getSpellPoints = ({level, primaryElement, secondaryElement, modifiers:{secondary: [first, second]}}: Spell) => {
  const elementFactor = (element: Element) => element === 'Âme' || element === 'Corps'
    ? 2
    : 1;


  const points = {
    primary: ((level+1)**2) * elementFactor(primaryElement) * 3 + first,
    secondary: ((level+1)**2) * elementFactor(secondaryElement) * 5 + second,
  };

  return {
    Air: (primaryElement === 'Air' ? points.primary : 0) + (secondaryElement === 'Air' ? points.secondary : 0),
    Corps: (primaryElement === 'Corps' ? points.primary : 0) + (secondaryElement === 'Corps' ? points.secondary : 0),
    Eau: (primaryElement === 'Eau' ? points.primary : 0) + (secondaryElement === 'Eau' ? points.secondary : 0),
    Feu: (primaryElement === 'Feu' ? points.primary : 0) + (secondaryElement === 'Feu' ? points.secondary : 0),
    Terre: (primaryElement === 'Terre' ? points.primary : 0) + (secondaryElement === 'Terre' ? points.secondary : 0),
    Âme: (primaryElement === 'Âme' ? points.primary : 0) + (secondaryElement === 'Âme' ? points.secondary : 0),
  };
}