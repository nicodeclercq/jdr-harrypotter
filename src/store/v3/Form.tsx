import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { pipe } from "fp-ts/function";
import * as ArrayFP from "fp-ts/Array";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { GAME, Trait } from "./v3";
import { roll } from "../../helpers/number";
import { Label } from "../../components/font/Label";
import { Icon } from "../../components/icons/Icon";
import { keys, map } from "../../helpers/object";
import { shuffle } from "../../helpers/array";

const MID_TRAIT = 12;
const rollTraits = () =>
  pipe(
    shuffle([
      "Force",
      "Constitution",
      "Perception",
      "Intelligence",
      "Dextérité",
      "Charisme",
    ]),
    ArrayFP.partitionWithIndex((index) => index % 2 === 0),
    ({ left, right }) =>
      left.reduce((acc, l, index) => {
        const r = roll(1, "d6");
        return {
          ...acc,
          [l]: MID_TRAIT + r,
          [right[index]]: MID_TRAIT - r,
        };
      }, {} as Record<Trait, number>)
  );

const defaultTraits = rollTraits();

export function Form({
  game,
  callback,
}: {
  game: string;
  callback: (result: { traits: Record<Trait, number> }) => void;
}) {
  const [remainingPoints, setRemainingPoints] = useState(0);
  const Pouvoir = useMemo(() => roll(2, "d6") + 6, []);
  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<Record<Trait, number>>({
    defaultValues: {
      ...defaultTraits,
      Pouvoir,
    },
  });

  const onSubmit = (traits: Record<Trait, number>) => {
    callback({
      traits: map((trait) => trait * 1, traits),
    });
  };

  const rollAll = () => {
    Object.entries(rollTraits()).forEach(([trait, value]) => {
      setValue(trait as Trait, value);
    });
  };

  const onTraitChange =
    (trait: Trait, callback: (value: number | undefined) => void) =>
    (value: number | undefined) => {
      const currentValue = getValues()[trait];
      setRemainingPoints(remainingPoints - (value ?? 0) + currentValue);
      callback(value);
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full">
        {keys(
          game === GAME.FANTASY ? defaultTraits : { ...defaultTraits, Pouvoir }
        )
          .sort()
          .map((trait: Trait) => (
            <div
              key={trait}
              className="flex flex-row p-2 border-gray-100 space-x-3 border-b-1"
            >
              <Label htmlFor={`input-${trait}`}>{trait}</Label>
              <Controller
                name={trait}
                control={control}
                rules={{ required: true, min: 1, max: 20 }}
                render={({ field: { value, onChange } }) => (
                  <Input
                    id={`input-${trait}`}
                    errors={errors[trait]}
                    value={value}
                    type="number"
                    theme="neutral"
                    max="18"
                    min="6"
                    onChange={onTraitChange(trait, onChange)}
                  />
                )}
              />
            </div>
          ))}
        <div className="flex flex-row items-center space-x-2">
          <Button onClick="submit" type="primary">
            Valider
          </Button>
          <div className="flex flex-row justify-between flex-grow p-2">
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
            <Button type="secondary" onClick={rollAll}>
              <Icon name="DICE" />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
