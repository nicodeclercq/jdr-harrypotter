import { useEffect, useState } from "react";
import { pipe } from "fp-ts/function";

import { Button } from "./Button";
import { Modal } from "./Modal";
import { Roll } from "./Roll";
import { Title } from "./font/Title";
import { Caption } from "./font/Caption";
import { Comment } from "./font/Comment";
import * as Interaction from "../helpers/interaction";
import { Dice } from "./dice/dice";
import { useSocket } from "../hooks/useSocket";
import { Input } from "./Input";
import { useLockKey } from "../hooks/useLockKey";
import { RemoteDataFold } from "./RemoteDataFold";
import { LOCK } from "../lock";
import { Select } from "./Select";
import { Label } from "./font/Label";

export type Interpretation = {
  predicate: (value: number, percentage: number) => boolean;
  result: {
    type: "success" | "failure" | "critical-success" | "critical-failure";
    message: string;
  };
};

type Props = {
  successPercentage?: number;
  title: string;
  onRollEnd: (result: Interaction.Interaction<never, number>) => void;
  isCancellable?: boolean;
  dices?: Dice[];
  resultsInterpretation?: Interpretation[];
};

type RollType = "advantage" | "disadvantage" | "none";

function DifficultySelection({
  withAdvantage,
  successPercentage,
  onSelection,
}: {
  withAdvantage: boolean;
  successPercentage: number;
  onSelection: (value: number, rollType: RollType) => void;
}) {
  const [customDifficulty, setCustomDifficulty] = useState(0);
  const [rollType, setRollType] = useState<RollType>("none");

  const successPercentages = {
    veryEasy: successPercentage + 20,
    easy: successPercentage + 10,
    normal: successPercentage,
    hard: successPercentage - 10,
    veryHard: successPercentage - 20,
  };

  return (
    <div className="flex flex-col space-y-2">
      <Title>Chances de succès: {successPercentage}%</Title>
      <br />
      <hr />
      {withAdvantage && (
        <>
          <Label htmlFor="rollType">Avantage / Désavantage</Label>
          <Select<RollType>
            id="rollType"
            onChange={(r) => setRollType(r as RollType)}
            options={[
              { label: "-", value: "none" },
              { label: "Avantage", value: "advantage" },
              { label: "Désavantage", value: "disadvantage" },
            ]}
          />
        </>
      )}

      <br />
      <Caption>Sélection de la difficulté:</Caption>
      <Button
        disabled={successPercentages.veryEasy <= 0}
        type="secondary"
        onClick={() =>
          onSelection(
            successPercentages.veryEasy <= 100
              ? successPercentages.veryEasy
              : 100,
            rollType
          )
        }
      >
        Très facile&nbsp;<Comment>(+20%)</Comment>
      </Button>
      <Button
        disabled={successPercentages.easy <= 0}
        type="secondary"
        onClick={() =>
          onSelection(
            successPercentages.easy <= 100 ? successPercentages.easy : 100,
            rollType
          )
        }
      >
        Facile&nbsp;<Comment>(+10%)</Comment>
      </Button>
      <Button
        disabled={successPercentages.normal <= 0}
        type="primary"
        onClick={() =>
          onSelection(
            successPercentages.normal <= 100 ? successPercentages.normal : 100,
            rollType
          )
        }
      >
        Normal
      </Button>
      <Button
        disabled={successPercentages.hard <= 0}
        type="secondary"
        onClick={() =>
          onSelection(
            successPercentages.hard <= 100 ? successPercentages.hard : 100,
            rollType
          )
        }
      >
        Difficile&nbsp;<Comment>(-10%)</Comment>
      </Button>
      <Button
        disabled={successPercentages.veryHard <= 0}
        type="secondary"
        onClick={() =>
          onSelection(
            successPercentages.veryHard <= 100
              ? successPercentages.veryHard
              : 100,
            rollType
          )
        }
      >
        Très difficile&nbsp;<Comment>(-20%)</Comment>
      </Button>
      <hr />
      <div className="flex flex-row items-center p-4 space-x-2">
        <Input
          theme="neutral"
          width="25%"
          min={-100}
          max={100}
          value={customDifficulty}
          onChange={(newValue: number | undefined) =>
            setCustomDifficulty(newValue && !isNaN(newValue) ? newValue : 0)
          }
          type="number"
        />
        <div className="flex flex-col items-stretch flex-grow">
          <Button
            disabled={successPercentage + customDifficulty <= 0}
            type="secondary"
            onClick={() =>
              onSelection(
                successPercentage + customDifficulty <= 100
                  ? successPercentage + customDifficulty
                  : 100,
                rollType
              )
            }
          >
            Difficulté personalisée&nbsp;
            <Comment>
              ({customDifficulty > 0 ? "+" : ""}
              {customDifficulty}%)
            </Comment>
          </Button>
        </div>
      </div>
      <br />
      <hr />
      <br />
      <div className="flex flex-col items-end justify-end">
        <Button type="secondary" onClick={() => onSelection(0, rollType)}>
          Annuler
        </Button>
      </div>
    </div>
  );
}

const defaultInterpretation: Interpretation[] = [
  {
    predicate: (value: number, percentage: number) =>
      value < percentage && value <= 5,
    result: {
      type: "critical-success",
      message: "🎉 Réussite critique 🎉",
    },
  },
  {
    predicate: (value: number, percentage: number) => value < percentage,
    result: {
      type: "success",
      message: "Réussite",
    },
  },
  {
    predicate: (value: number, percentage: number) =>
      value > percentage && value < 95,
    result: {
      type: "failure",
      message: "Échec",
    },
  },
  {
    predicate: (value: number) => value > 95,
    result: {
      type: "critical-failure",
      message: "😈 Échec Critique 😈",
    },
  },
];

export function RollModal({
  successPercentage,
  dices = ["d100", "d10"],
  title,
  onRollEnd,
  isCancellable = true,
  resultsInterpretation = defaultInterpretation,
}: Props) {
  const { isUnlocked } = useLockKey();
  const { emit } = useSocket();
  const [value, setValue] = useState(NaN);
  const [value1, setValue1] = useState(NaN);
  const [value2, setValue2] = useState(NaN);
  const [rollType, setRollType] = useState<RollType>("none");
  const [percentage, setPercentage] = useState(NaN);

  useEffect(() => {
    if (percentage || !successPercentage) {
      if (rollType === "none") {
        setValue(value1);
      }
      if (rollType === "advantage") {
        setValue(Math.min(value1, value2));
      }
      if (rollType === "disadvantage") {
        setValue(Math.max(value1, value2));
      }
    }
  }, [value1, value2, rollType, percentage]);

  const isD100 = (dices: Dice[]): dices is ["d100", "d10"] => {
    return dices.length === 2 && dices[0] === "d100" && dices[1] === "d10";
  };
  const concatD100 = ([tens, units]: number[]) => tens + units || 100;
  const concat = (values: number[]) => values.reduce((a, b) => a + b, 0);

  const getInterpretation = () =>
    resultsInterpretation.find((interpretation) =>
      interpretation.predicate(value, percentage)
    );

  const onRollEndEvent = () => {
    if (!percentage) {
      onRollEnd(Interaction.canceled());
      emit({
        type: "roll",
        payload: {
          title,
          value,
          type: "free-throw",
        },
      });
    } else {
      const interpretation = getInterpretation();
      if (interpretation) {
        const { result } = interpretation;
        emit({
          type: "roll",
          payload: {
            title,
            value,
            type: interpretation.result.type,
          },
        });
        result.type === "success" || result.type === "critical-success"
          ? onRollEnd(Interaction.success(value))
          : onRollEnd(Interaction.emptyFailure());
      } else {
        onRollEnd(Interaction.canceled());
        emit({
          type: "roll",
          payload: {
            title,
            value,
            type: "free-throw",
          },
        });
      }
    }
  };

  return (
    <RemoteDataFold
      data={isUnlocked(LOCK.ADVANTAGE)}
      onSuccess={(withAdvantage) => (
        <Modal header={<span className="space-x-2">{title}</span>}>
          {isNaN(percentage) && successPercentage ? (
            <DifficultySelection
              withAdvantage={withAdvantage}
              successPercentage={successPercentage}
              onSelection={(value, rollType) => {
                if (value === 0) {
                  onRollEnd(Interaction.canceled());
                } else {
                  setPercentage(value);
                  setRollType(rollType);
                }
              }}
            />
          ) : (
            <>
              {!isNaN(percentage) && (
                <span className="text-center text-m">
                  Niveau actuel: {percentage}%
                </span>
              )}
              <div className="flex justify-center">
                <Roll
                  dices={dices}
                  concat={isD100(dices) ? concatD100 : concat}
                  onRollEnd={(val) => setValue1(val)}
                />
                {rollType !== "none" && (
                  <Roll
                    dices={dices}
                    concat={isD100(dices) ? concatD100 : concat}
                    onRollEnd={(val) => setValue2(val)}
                  />
                )}
              </div>
              <div className="flex flex-col items-center justify-center mb-2 space-y-4">
                {!isNaN(value) && (
                  <>
                    <span className="text-4xl">{value}</span>
                    {rollType !== "none" && (
                      <span>
                        (avec&nbsp;
                        {rollType === "advantage" ? "Avantage" : "Désavantage"})
                      </span>
                    )}
                    {!isNaN(percentage) && (
                      <div className="flex flex-col items-center justify-center space-y-1">
                        {pipe(getInterpretation(), (interpretation) =>
                          interpretation != null ? (
                            <>
                              <span className="text-m">
                                {interpretation.result.type === "success" ||
                                interpretation.result.type ===
                                  "critical-success"
                                  ? "😀"
                                  : "🙁"}
                              </span>
                              <span>{interpretation.result.message}</span>
                            </>
                          ) : (
                            <></>
                          )
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="flex justify-end space-x-4">
                {isCancellable && (
                  <Button
                    type="secondary"
                    title="Ce jet de dés ne sera pas comptabilisé"
                    onClick={() => onRollEnd(Interaction.canceled())}
                  >
                    Annuler
                  </Button>
                )}
                <Button
                  disabled={isNaN(value)}
                  type="primary"
                  title="En validant tes jets de dés tu enregistres une utilisation qui te permet d'améliorer tes sorts ou compétences petit à petit"
                  onClick={onRollEndEvent}
                >
                  Valider ce jet
                </Button>
              </div>
            </>
          )}
        </Modal>
      )}
    />
  );
}
