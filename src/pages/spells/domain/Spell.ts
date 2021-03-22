import { pipe } from 'fp-ts/lib/function';
import * as Ord from 'fp-ts/Ord';

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

const random10 = [2,7,8,9,2,9,8,5,3,2,8,8,4,8,8,9,9,3,7,9,4,2,8,1,4,7,2,0,8,5,2,2,5,5,6,6,1,3,1,1,7,0,7,7,4,1,0,6,1,4,3,1,8,8,6,4,2,1,0,2,4,9,2,2,6,0,5,3,1,6,4,8,5,3,0,2,0,5,6,4,7,9,7,1,7,5,8,0,2,6,3,6,1,4,9,9,5,8,0,5,3,9,6,5,4,5,0,0,9,7,8,2,3,5,6,3,6,8,2,2,1,8,7,6,4,5,2,1,9,0,5,1,0,1,4,0,1,6,4,9,9,0,9,0,2,3,5,1,8,7,9,3,7,8,7,2,1,0,4,8,0,1,1,2,4,1,2,2,6,0,5,1,0,8,3,9,4,2,0,7,7,2,3,6,0,9,0,6,4,3,2,2,7,6,9,5,3,3,2,0];
const random3 = [2,2,0,2,0,2,0,0,0,1,2,0,1,1,2,0,2,1,2,0,2,1,2,2,2,2,2,1,1,2,0,0,2,2,2,2,2,1,1,0,0,1,2,0,0,2,2,1,0,0,2,1,2,0,0,1,0,2,0,0,2,1,2,0,0,2,2,0,2,0,1,2,2,0,1,0,1,2,1,1,2,0,1,2,0,1,2,2,0,0,2,2,1,0,2,2,2,0,0,2,2,1,0,2,1,2,1,0,2,2,2,2,1,2,1,1,0,1,0,2,0,2,1,2,1,2,1,2,2,2,1,1,2,2,2,1,1,0,1,1,0,1,2,2,0,2,2,2,2,2,2,2,2,0,1,2,0,2,1,1,2,2,0,1,2,2,0,2,1,1,1,1,1,0,1,2,0,1,0,1,2,0,1,0,2,0,1,0,1,0,0,2,2,0,0,1,0,2,2,2];

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

export const getSpellCost = (index: number, {level, primaryElement, secondaryElement}: Spell) => {
  const elementFactor = (element: Element) => element === 'Âme' || element === 'Corps'
    ? 2
    : 1;

  return {
    primary: ((level+1)**2) * elementFactor(primaryElement) * 5 + random10[index],
    secondary: ((level+1)**2) * elementFactor(secondaryElement) * 5 + random10[random10.length - 1 - index],
  }
};

export const getSpellPoints = (index: number, {level, primaryElement, secondaryElement}: Spell, uses: number) => {
  const elementFactor = (element: Element) => element === 'Âme' || element === 'Corps'
    ? 2
    : 1;


  const points = {
    primary: ((level+1)**2) * elementFactor(primaryElement) * 3 + random3[index] +  uses * 2,
    secondary: ((level+1)**2) * elementFactor(secondaryElement) * 5 + random3[random10.length - 1 - index] + uses,
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