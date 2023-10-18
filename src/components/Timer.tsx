import { useEffect, useState } from "react";
import { pipe } from "fp-ts/function";
import { Card } from "./Card";
import { Title } from "./font/Title";
import { Button } from "./Button";
import { Icon } from "./icons/Icon";
import { Caption } from "./font/Caption";
import { BodyText } from "./font/BodyText";
import { usePersistantState } from "../hooks/usePersistantState";

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

const getTimeValue = (time: number) => {
  const date = new Date(time);

  return {
    hours: date.getHours() - 1,
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
};

const DEFAULT_TIME = { hours: 0, minutes: 0, seconds: 0 };

export function Timer() {
  const [time, setTime] = useState<Time>(DEFAULT_TIME);
  const [startDate, setStartDate] = usePersistantState<Date | undefined>(
    "TIMER_START_DATE",
    undefined
  );
  const [totalTime, setTotalTime] = usePersistantState<Time>(
    "TIMER_TOTAL_TIME",
    DEFAULT_TIME
  );
  const [pauseDate, setPauseDate] = usePersistantState<Date | undefined>(
    "TIMER_PAUSE_TIME",
    new Date()
  );
  const [date, setDate] = usePersistantState("TIMER_TIME", new Date());

  useEffect(() => {
    const interval = setInterval(
      () =>
        pipe(new Date().getTime() - date.getTime(), getTimeValue, (time) => {
          if (!pauseDate) {
            setTime(time);
          }
        }),
      500
    );
    return () => clearInterval(interval);
  }, [date, pauseDate, setTime]);

  useEffect(() => {
    if (startDate) {
      const interval = setInterval(
        () =>
          pipe(
            new Date().getTime() - startDate.getTime(),
            getTimeValue,
            (time) => {
              setTotalTime(time);
            }
          ),
        500
      );
      return () => clearInterval(interval);
    }
  }, [setTotalTime, startDate]);

  const togglePause = () => {
    if (pauseDate) {
      const pausedTime = new Date().getTime() - pauseDate.getTime();
      setDate(new Date(date.getTime() + pausedTime));
      setPauseDate(undefined);
    } else {
      setPauseDate(new Date());
    }
  };

  return (
    <Card
      title={
        <div className="flex justify-between">
          <Title>Temps de jeu</Title>
          <div className="flex space-x-2">
            <Button type="secondary" title="pause" onClick={togglePause}>
              <Icon name={pauseDate ? "TIME" : "HALT"} />
            </Button>
            <Button
              type="secondary"
              title="reset"
              onClick={() => setDate(new Date())}
            >
              <span
                className="flex items-center"
                style={{ lineHeight: 1, fontSize: "0.5rem" }}
              >
                00:00
              </span>
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex justify-between px-2 py-1">
        {startDate ? (
          <Caption>
            {`${totalTime.hours}`.padStart(2, "0")}:
            {`${totalTime.minutes}`.padStart(2, "0")}:
            {`${totalTime.seconds}`.padStart(2, "0")}
          </Caption>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              setStartDate(new Date());
            }}
          >
            Start
          </Button>
        )}
        <BodyText>
          {`${time.minutes}`.padStart(2, "0")}:
          {`${time.seconds}`.padStart(2, "0")}
        </BodyText>
      </div>
    </Card>
  );
}
