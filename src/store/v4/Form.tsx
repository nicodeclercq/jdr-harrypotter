import { useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Skills } from "./v4";
import { GAME, State } from "../v3/v3";
import { Label } from "../../components/font/Label";
import { hpSkills, fantasySkills } from "../../pages/skills/skills";
import { entries } from "../../helpers/object";

const REPARTITION_POINTS = 200;

export function Form({
  state: { game, traits },
  callback,
}: {
  state: State;
  callback: (result: { skills: Skills }) => void;
}) {
  const skills = useMemo(
    () => (game === GAME.FANTASY ? fantasySkills : hpSkills),
    [game]
  );
  const defaultSkills = useMemo(
    () => entries(skills).sort(([s1], [s2]) => s1.localeCompare(s2)),
    [skills]
  );

  const [remainingPoints, setRemainingPoints] = useState(REPARTITION_POINTS);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<Record<string, number>>({
    defaultValues: defaultSkills.reduce(
      (acc, [name, { min, baseTrait }]) => ({
        ...acc,
        [name]: traits[baseTrait] > min ? traits[baseTrait] : min,
      }),
      {} as Record<string, number>
    ),
    resolver: (values: Record<string, number>) =>
      new Promise((resolve) => {
        if (remainingPoints < 0) {
          const firstEntry = entries(values)[0][0];
          resolve({
            values: {},
            // @ts-expects-error
            errors: {
              [firstEntry]: "Ça doit faire zéro",
            },
          });
        } else {
          resolve({ values, errors: {} });
        }
      }),
  });

  const onSkillChange =
    (skill: string, callback: (value: number | undefined) => void) =>
    (value: number | undefined) => {
      const currentValue = getValues()[skill];

      setRemainingPoints(remainingPoints - (value ?? 0) + currentValue);
      callback(value);
    };
  const setSkillValue = (skill: string, value: number) => {
    onSkillChange(skill, (v) => setValue(skill, v ?? 0))(value);
  };

  const onSubmit = (results: Record<string, number>) => {
    const skills = entries(results).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: {
          currentLevel: value,
        },
      }),
      {}
    );
    callback({ skills });
  };

  const getMin = (skill: string) =>
    traits[skills[skill].baseTrait] > skills[skill].min
      ? traits[skills[skill].baseTrait]
      : skills[skill].min;
  const getMax = (skill: string) => traits[skills[skill].baseTrait] * 5;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full">
        <div className="overflow-y-auto" style={{ height: "70vh" }}>
          {defaultSkills.map(([skill, skillValue]) => (
            <div
              key={skill}
              className="flex flex-row p-2 border-gray-100 space-x-3 border-b-1"
            >
              <Label htmlFor={`input-${skill}`}>
                {skill} ({skillValue.baseTrait})
              </Label>
              <Controller
                name={skill}
                control={control}
                rules={{
                  required: true,
                  min: getMin(skill),
                  max: getMax(skill),
                }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <Button
                      type="secondary"
                      onClick={() => setSkillValue(skill, getMin(skill))}
                    >
                      Min ({getMin(skill)}%)
                    </Button>
                    <Input
                      id={`input-${skill}`}
                      errors={errors[skill]}
                      value={value}
                      type="number"
                      theme="neutral"
                      max={getMax(skill)}
                      min={getMin(skill)}
                      onChange={onSkillChange(skill, onChange)}
                    />
                    <Button
                      type="secondary"
                      onClick={() => setSkillValue(skill, getMax(skill))}
                    >
                      Max ({getMax(skill)}%)
                    </Button>
                  </>
                )}
              />
            </div>
          ))}
        </div>
        <div className="space-x-2">
          <Button
            onClick="submit"
            disabled={remainingPoints < 0}
            type="primary"
          >
            Valider
          </Button>
          <span className={remainingPoints < 0 ? "text-red-500" : ""}>
            {remainingPoints === 0
              ? ""
              : remainingPoints > 0
              ? `Il reste ${remainingPoints} point${
                  remainingPoints === 1 ? "" : "s"
                } à répartir`
              : `Tu as utilisé ${remainingPoints * -1} point${
                  remainingPoints === -1 ? "" : "s"
                } de trop`}
          </span>
        </div>
      </div>
    </form>
  );
}
