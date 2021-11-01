import React, { useCallback, useRef, useState } from 'react';
import { useInterval } from '../hooks/useInteval';
import { D10 } from './dice/D10';
import { D100 } from './dice/D100';
import { D4 } from './dice/D4';
import { D6 } from './dice/D6';
import { D20 } from './dice/D20';
import * as Dice from './dice/dice';

type Props<T extends Dice.Dice[]> = {
  dices: T;
  concat: (values: number[]) => number;
  onRollEnd: (value: number) => void;
};

const DoRoll = ({dices}: {dices: {type: Dice.Dice, value: number}[]}) => {
  return <div className="flex items-center p-4 space-x-2">
    {
      dices.map(
        (current, index) => Dice.fold({
          onD4: () => <D4 key={index} value={current.value}/>,
          onD6: () => <D6 key={index} value={current.value}/>,
          onD10: () => <D10 key={index} value={current.value}/>,
          onD20: () => <D20 key={index} value={current.value}/>,
          onD100: () => <D100 key={index} value={current.value}/>,
        })(current.type)
      )
    }
  </div>;
}

export function Roll<T extends Dice.Dice[]>({dices, concat, onRollEnd}: Props<T>) {
  const { current: values } = useRef(dices
    .map((type) => ({
      type,
      values: Dice.getRollValues(type),
    })));

  const [index, setIndex] = useState(0);

  const onResult = useCallback(() => onRollEnd(concat(values.map(({values}) => values[values.length - 1]))), [concat, onRollEnd, values]);

  useInterval(
    (stop) => {
      if(index < values[0].values.length - 1) {
        setIndex(index + 1);
      } else {
        stop();
        onResult();
      }
    },
    42
  );

  return <DoRoll dices={values.map(({type, values}) => ({type, value: values[index]}))} />;
}