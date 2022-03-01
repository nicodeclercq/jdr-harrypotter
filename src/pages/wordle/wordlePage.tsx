import React, { useMemo, useState } from 'react';
import { Button } from '../../components/Button';
import { Layout } from '../../components/Layout';
import { createArray, createArrayOfIndex } from '../../helpers/array';
import { of, Discovered, Unknown, createPuzzle, getLastTrial, isDiscovered, Letter, Puzzle, tryWord, Misplaced, isMisplaced, isUnknown } from './helper';
import { Info } from '../../components/Info';
import { usePersistantState } from '../../hooks/usePersistantState';
import { doesWordExists } from './dictionnary';

const MAX_TRIALS = 6;

function KeyBoard({ unusedLetters, onClick }: { unusedLetters: string[], onClick: (char: string) => void}) {
  const keyboardChars = [
    [ 'A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P' ] ,
    [ 'Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M' ], 
    [ '⌫', 'W', 'X', 'C', 'V', 'B', 'N', '-', '⏎']
  ];

  return (
    <div className='flex flex-col gap-4'>
      {
        keyboardChars.map((line, index) => (
          <div key={index} className='flex flex-row justify-center gap-4'>
            {
              line.map((char) => (
                <div style={{opacity: unusedLetters.includes(char) ? 0.25 : 1}}>
                  <Button key={char} type="secondary" onClick={() => onClick(char)}>{char}</Button>
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  )

}

function DiscoveredLetter({letter}: {letter: Discovered<string>}){
  return (
    <div className='flex items-center justify-center w-6 h-8 text-green-200 bg-green-700 border border-green-200 rounded-sm' style={{
      textDecoration: 'underline'
    }}>{letter.value}</div>
  )
}
function MisplacedLetter({letter}: {letter: Misplaced<string>}){
  return (
    <div className='flex items-center justify-center w-6 h-8 text-gray-700 bg-yellow-500 border border-gray-300 rounded-sm' style={{
    }}>{letter.value}</div>
  )
}
function UnknownLetter({letter}: {letter: Unknown<string>}){
  return (
    <div className='flex items-center justify-center w-6 h-8 text-gray-600 bg-gray-400 border border-gray-300 rounded-sm' style={{
    }}>{letter.value}</div>
  )
}
function RawLetter({letter}: {letter: string}){
  return (
    <div className='flex items-center justify-center w-6 h-8 text-gray-300 border border-gray-300 rounded-sm' style={{
    }}>{letter}</div>
  )
}
function Word({ length, letters }: {length: number; letters: Array<Letter<string> | string>}) {
  return (
    <div className='flex flex-row gap-2'>
      {
        createArrayOfIndex(length).map((index) => {
          const letter = letters[index];
          if(isDiscovered(letter)){
            return <DiscoveredLetter key={index} letter={letter} />
          }
          if(isMisplaced(letter)){
            return <MisplacedLetter key={index} letter={letter} />
          }
          if(isUnknown(letter)){
            return <UnknownLetter key={index} letter={letter} />
          } else{
            return <RawLetter key={index} letter={letter} />
          }
        })
      }
    </div>
  )
}

type State = 'UNDONE' | 'SUCCESS' | 'FAILURE' | 'UNKNOWN_WORD';
const getState = (puzzle: Puzzle): State => {
  const lastTrial = getLastTrial(puzzle);
  if(lastTrial ==null){
    return 'UNDONE';
  }
  const isSuccess = lastTrial.reduce((acc, cur) => acc && isDiscovered(cur), true);
  if(isSuccess){
    return 'SUCCESS';
  }
  if(puzzle.trials.length === MAX_TRIALS){
    return 'FAILURE';
  }
  return 'UNDONE';
}

function Success(){
  return (
    <div className="p-2 text-green-200 bg-green-700 border shadow rounded-md">
      Bravo tu as trouvé The mot of The jour!
    </div>
  )
}
function Failure(){
  return (
    <div className="p-2 text-red-200 bg-red-700 border shadow rounded-md">
      Pas de chance aujourd'hui... peut être une autre fois.
    </div>
  )
}
function UnknownWord(){
  return (
    <div className="p-2 text-orange-200 bg-orange-700 border shadow rounded-md">
      Oups, je ne connaissais pas ce mot... tu viens de l'inventer?
    </div>
  )
}
function TheWord(){
  return (
    <div className="p-2">
      The mot
    </div>
  )
}
export function WordlePage(){
  const [puzzle, setPuzzle] = usePersistantState('WORDLE_PUZZLE', createPuzzle());
  const [trial, setTrial] = useState<string[]>([]);
  const emptyWord = createArray(puzzle.solution.length, '');
  const [currentState, setCurrentState] = useState<State>(getState(puzzle));
  const unusedLetters = useMemo(() => puzzle
    .trials
    .reduce(
      (acc, word) => [...acc, ...word.filter(isUnknown)], []),
      [puzzle]
    )
    .map(({value}) => value)
    .filter(letter => !puzzle.solution.includes(letter)
  , [puzzle]);

  const onKeyboard = (char: string) => {
    if(currentState === "UNDONE" || currentState === 'UNKNOWN_WORD'){
      if(char === '⌫'){
        if(currentState === 'UNKNOWN_WORD'){
          setCurrentState('UNDONE');
        }
        setTrial(trial.filter((t, index, arr) => index !== arr.length - 1));
      } else if(char === '⏎'){
        if(trial.length === puzzle.solution.length){
          const word = trial.join('');
          if(doesWordExists(word)){
            const newPuzzle = tryWord(word)(puzzle);
            setPuzzle(newPuzzle);
            setCurrentState(getState(newPuzzle));
            setTrial([]);
          } else {
            setCurrentState('UNKNOWN_WORD');
          }
        }
      } else if(trial.length < puzzle.solution.length){
        setTrial([...trial, char]);
      }
    }
  }

  return (
    <Layout>
      <Info icon="GAME">
        Petite pause détente?<br/>
        Le jeu est simple il suffit de trouver The mot en {MAX_TRIALS} coups.<br/>
        Une fois la réponse soumise tu auras des supers indications particulièrement utiles, oui! oui!<br/>
        <ul>
          <li className='flex flex-row pt-2 gap-2'>
            <DiscoveredLetter letter={of.Discovered('A')} />
            <span>ça ça veut dire que c'est tout bon pour cette lettre</span></li>
          <li className='flex flex-row pt-2 gap-2'>
            <MisplacedLetter letter={of.Misplaced('B')} />
            <span>là c'est que tu t'es trompé de place</span></li>
          <li className='flex flex-row pt-2 gap-2'>
            <UnknownLetter letter={of.Unknown('C')} />
            <span>et là, bah la lettre n'es tout simplement pas dans The mot</span></li>
        </ul>
        tu vois c'est simple
      </Info>
      <div className='flex flex-col items-center gap-8'>
          {currentState === 'UNDONE' && <TheWord />}
          {currentState === 'SUCCESS' && <Success />}
          {currentState === 'FAILURE' && <Failure />}
          {currentState === 'UNKNOWN_WORD' && <UnknownWord />}
          <div className='flex flex-col p-2 gap-4'>
            {
              createArrayOfIndex(MAX_TRIALS).map((index) => (
                <Word
                  key={index}
                  length={puzzle.solution.length}
                  letters={
                      puzzle.trials[index]           ? puzzle.trials[index]
                    : index === puzzle.trials.length ? trial
                    : /* default */                    emptyWord
                  }
                />
              ))
            }
          </div>
        <KeyBoard onClick={onKeyboard} unusedLetters={unusedLetters} />
      </div>
    </Layout>
  )
}