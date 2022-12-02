import { random } from "../../helpers/number";

export type Dice = 'd4' | 'd6' | 'd10' | 'd20' | 'd100';

export const range: Record<Dice, {min: number, max: number}> = {
  d4: {min: 1, max: 4},
  d6: {min: 1, max: 6},
  d10: {min: 0, max: 9},
  d20: {min: 1, max: 20},
  d100: {min: 0, max: 9},
}

export const getRollValues = (type: Dice) => {
  const modifiers = {
    d4: 1,
    d6: 1,
    d10: 1,
    d20: 1,
    d100: 10,
  }
  return new Array(55)
    .fill(0)
    .map(() => random(range[type].min, range[type].max) * modifiers[type])
};

export const fold = <T>({onD4, onD6, onD10, onD20, onD100}: {
  onD4: () => T;
  onD6: () => T;
  onD10: () => T;
  onD20: () => T;
  onD100: () => T;
}) => (type: Dice): T => {
  switch(type) {
    case 'd4':
      return onD4();
    case 'd6':
      return onD6();
    case 'd10':
      return onD10();
    case 'd20':
      return onD20();
    case 'd100':
      return onD100();
  }
};