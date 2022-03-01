import { isDefined } from './../../helpers/nullable';
import { pipe } from 'fp-ts/function';
import { getWordOfTheDay } from './dictionnary';


export type Unknown<T extends string> = {
  _type: 'Unknown';
  value: T;
}
export const isUnknown = <T extends string>(letter: Letter<T> | string): letter is Unknown<T> => typeof letter === 'object' && letter._type === 'Unknown';
export type Discovered<T extends string> = {
  _type: 'Discovered';
  value: T;
}
export const isDiscovered = <T extends string>(letter: Letter<T> | string): letter is Discovered<T> => typeof letter === 'object' && letter._type === 'Discovered';
export type Misplaced<T extends string> = {
  _type: 'Misplaced';
  value: T;
}
export const isMisplaced = <T extends string>(letter: Letter<T> | string): letter is Misplaced<T> => typeof letter === 'object' && letter._type === 'Misplaced';

export type Letter<T extends string> = Unknown<T> | Discovered<T> | Misplaced<T>;

export const of = {
  Unknown: <T extends string>(letter: T) => ({
    _type: 'Unknown' as const,
    value: letter,
  }),
  Discovered: <T extends string>(letter: T) => ({
    _type: 'Discovered' as const,
    value: letter,
  }),
  Misplaced: <T extends string>(letter: T) => ({
    _type: 'Misplaced' as const,
    value: letter,
  }),
}

export type Word = Letter<string>[];
export type Puzzle = {
  solution: string,
  trials: Word[];
};

export const createPuzzle = (): Puzzle => ({
  solution: getWordOfTheDay(),
  trials: []
});

const addTrial = (puzzle: Puzzle, trial: string): Puzzle => {
  return {
    ...puzzle,
    trials: [
      ...puzzle.trials,
      trial.split('').map(of.Unknown),
    ],
  }
}
export const getLastTrial = (puzzle: Puzzle) => puzzle.trials[puzzle.trials.length - 1];
const changeLastTrial = (puzzle: Puzzle, trial: Word) => ({
  ...puzzle,
  trials: puzzle.trials.map((t, index, arr) => index === arr.length - 1
    ? trial
    : t
  ),
});
const setDiscoveredLetters = (puzzle: Puzzle): Puzzle => {
  const solution = puzzle.solution.split('');
  const letters: Word = getLastTrial(puzzle)
    .map((letter, index) => letter.value === solution[index]
      ? of.Discovered(letter.value)
      : letter
    );

  return changeLastTrial(puzzle, letters);
};

const setMisplacedLetters = (puzzle: Puzzle): Puzzle => {
  const lastTrial = getLastTrial(puzzle);
  const unknownLetters = lastTrial
    .map((letter, index) => isUnknown(letter)
      ? puzzle.solution[index]
      : undefined
    )
    .filter(isDefined);

  const currentResult = unknownLetters.reduce((acc, letter) => {
    const trialLetters = acc.trial.map((t) => isUnknown(t)
      ? t.value
      : '_');
    if(trialLetters.includes(letter)){
      const misplacedLetterIndex = unknownLetters.indexOf(letter);
      const letterIndex = trialLetters.indexOf(letter);

      return {
        unknownLetters: acc.unknownLetters.filter((l, index) => index !== misplacedLetterIndex),
        trial: acc.trial.map((t, index) => index === letterIndex
          ? of.Misplaced(letter)
          : t
        )
      }
    }
    return acc;
  },{
    unknownLetters,
    trial: lastTrial,
  } as const);

  return changeLastTrial(puzzle, currentResult.trial);
};

export const tryWord = (trial: string) => (puzzle: Puzzle) => pipe(
  addTrial(puzzle, trial),
  setDiscoveredLetters,
  setMisplacedLetters,
);
