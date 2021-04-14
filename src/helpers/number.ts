import { randomInt } from 'fp-ts/lib/Random';

export const random = (min: number, max: number) => randomInt(min, max)();
export const add = (a: number, b: number) => a + b;

export const d6 = () => random(1, 6);
export const d100 = () => random(0, 100);

export const roll = (diceNumber: number, diceType: 'd6' | 'd100') => {
  const dices = {
    'd6': d6,
    'd100': d100,
  };

  return new Array(diceNumber)
    .fill(0)
    .map(() => dices[diceType]())
    .reduce(add, 0);
}