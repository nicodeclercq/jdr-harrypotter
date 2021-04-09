import { random } from "../../helpers/number";

export type Dice = 'd6' | 'd10' | 'd100';

export const range: Record<Dice, {min: number, max: number}> = {
  d6: {min: 1, max: 6},
  d10: {min: 0, max: 9},
  d100: {min: 0, max: 9},
}

export const getRollValues = (type: Dice) => {
  const modifiers = {
    d6: 1,
    d10: 1,
    d100: 10,
  }
  return new Array(50).fill(0).map(() => random(range[type].min, range[type].max) * modifiers[type])
};

export const fold = <T>({onD6, onD10, onD100}: {
  onD6: () => T;
  onD10: () => T;
  onD100: () => T;
}) => (type: Dice) => {
  if (type === 'd6') {
    return onD6();
  } else if (type === 'd10') {
    return onD10();
  } else {
    return onD100();
  }
};