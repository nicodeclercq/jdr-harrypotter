import { FunctionN } from 'fp-ts/function';
import { randomInt } from 'fp-ts/lib/Random';

export const random = (min: number, max: number) => randomInt(min, max)();
export const add = (a: number, b: number) => a + b;
export const withinBounds = ({min, max}:{min: number, max: number}) => (value: number) => {
  if(value < min){
    return min;
  }
  if(value > max){
    return max;
  }
  return value;
}
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

export const withNDecimals = (decimals: number, value: number) => {
  const factor = new Array(decimals).fill(10).reduce((acc, cur) => acc * cur, 1);
  return Math.round(value * factor) / factor;
}

export const addRandomPercent = (percent: number, value: number) =>
  random(value, value + value * percent / 100);

export const getOrElse = (orElse: FunctionN<[], number>) => (value: number) => isNaN(value) ? orElse() : value;