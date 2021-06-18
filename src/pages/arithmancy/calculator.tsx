import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { State } from '../../store/State';
import { Tag } from '../../components/Tag';

export function Calculator({numbers, roll}: {roll: (value: string, percentage: number) => void; numbers: State['arithmancy']['numbers']}) {
  const [calculation, setCalculation] = useState<number[]>([]);

  const setNumber = (index: number) => () => {
    setCalculation([...calculation, index]);
  }

  const reset = () => {
    setCalculation([]);
  }

  const getValue = (index: number | undefined, isInverse: boolean) => {
    const number = index != null
      ? numbers[index - 1]
      : undefined;

    return number   == null    ? '⍰'
      : number.type === 'name' ? number.value
      : number.type === 'verb' ? (isInverse ? number.invert : number.value)
      : '';
  }

  const isDefined = (number: number) => numbers[number - 1] != null;
  const isNumberInverse = (number: number) => isDefined(number) && numbers[number - 1]?.type === 'inverse';
  const isOdd = (number: number) => Math.abs(number) % 2 === 1;
  const getSum = () => calculation.reduce((acc, cur) => {
      return isNumberInverse(cur)
        ? acc - cur
        : acc + cur
    }, 0);
  const isInverse = isOdd(getSum());
  const getPhrase = () => calculation.map(v => getValue(v, isInverse)).join(' ');
  const getPhraseDisplay = () => calculation.map(v => getValue(v, isInverse)).map((v) => <div key={v}>{v}</div>);

  return (
    <div className="p-4 bg-gray-600 border border-gray-800 rounded shadow" style={{width: '20rem'}}>
      <div className="p-4 font-mono text-xl text-gray-200 bg-gray-700 border border-gray-400 rounded" style={{width: '100%'}}>
        <div className="flex flex-row flex-wrap items-end justify-end  space-x-2" style={{ minHeight: '5rem'}}>
          {
            calculation.length === 0
              ? <div className="text-gray-900">0</div>
              : calculation.map((number, index) => (
                  <div key={number} className="flex flex-row space-x-2">
                    <div className="space-x-1">
                      {
                          index === 0 ? ''
                        : isNumberInverse(number) ? '-'
                        : '+'
                      }
                    </div>
                    <div>{ number }</div>
                  </div>
                ))
          }
        </div>
        <hr className={calculation.length === 0 ? 'border-gray-900' : 'border-gray-200'} />
        <div className={`flex flex-row ${calculation.length === 0 ? 'text-gray-900' : 'text-gray-200'}`} >
          <div className="flex-grow">=</div>
          <div>{getSum()}</div>
        </div>
        <div className={`flex flex-row items-center space-x-3 ${calculation.length === 0 ? 'text-gray-900' : 'text-gray-200'}`}>
          <div className="flex flex-col items-center" style={{lineHeight: '0.95'}}>
            <span>⌈</span>
            <span>⎨</span>
            <span>⌊</span>
          </div>
          <div className="flex flex-col">
            <div className="space-x-2">
              <span>{getSum() * 5} %</span>
              {isInverse && <Tag color="yellow" title="type 'Inverse'" >Inverse</Tag>}
            </div>
            <div className="flex flex-row flex-wrap space-x-3">{calculation.length === 0 ? '-' : getPhraseDisplay()}</div>
          </div>
        </div>
      </div>
      <div className="p-4 grid grid-cols-3 gap-4">
        {
          numbers.map((_, index) => (
            <Button key={`button_${index}`} disabled={calculation.includes(index + 1)} onClick={setNumber(index + 1)} type="secondary">
              <span style={{fontSize: '3rem', width: '3rem'}}>{index + 1}</span>
            </Button>
          ))
        }
        <Button onClick={reset} type="primary">
          CE
        </Button>
        <div className="flex items-center justify-center text-lg text-gray-400">⍹</div>
        <Button
          disabled={calculation.length === 0}
          onClick={() => {
            roll(getPhrase(), getSum() * 5);
            setCalculation([]);
          }}
          type="tertiary"
        >
          Lancer
        </Button>
      </div>
    </div>
  )
}