import React, { useEffect, useState } from 'react';
import { pipe } from 'fp-ts/function';
import { Card } from './Card';
import { Title } from './font/Title';
import { Button } from './Button';
import { Icon } from './icons/Icon';

type Time = {
  minutes: number;
  seconds: number;
}

const getTimeValue = (time: number) => {
  const milliseconds = Math.round(time / 1000);
  const minutes = Math.round(milliseconds / (60 * 60));
  const seconds = Math.round(milliseconds % (60 * 60));

  return {
    minutes,
    seconds,
  };
}

const DEFAULT_TIME = {minutes: 0, seconds: 0};

export function Time(){
  const [time, setTime] = useState<Time>(DEFAULT_TIME);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => pipe(
      new Date().getTime() - date.getTime(),
      getTimeValue,
      setTime,
    ), 500);
    return () => clearInterval(interval);
  }, [date]);

  return (
    <Card title={
      <div className="flex space-between">
        <Title>Temps</Title>
        <div className="flex space-x-2">
          <Button type="tertiary" title="pause" onClick={() => setIsPaused(!isPaused)}>
            <Icon name={isPaused ? 'HALT' : 'UP'} />
          </Button>
          <Button type="tertiary" title="reset" onClick={() => setDate(new Date())}>
            <Icon name="TIME" />
          </Button>
        </div>
      </div>
    }>
      {time.minutes}:{time.seconds}
    </Card>
  )
}