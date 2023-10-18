import React from "react";
import { pipe } from "fp-ts/function";
import { Controller, useForm } from "react-hook-form";

import { Card } from "../../components/Card";
import { Label } from "../../components/font/Label";
import { Input } from "../../components/Input";
import { useMoney } from "./useMoney";
import { Icon } from "../../components/icons/Icon";
import { CurrencyDivisions, getDivisions } from "../../helpers/moneyHelper";

export function MoneyForm({money}: {money: number}){
  const { setMoney } = useMoney();
  const { handleSubmit, control } = useForm<{money: {gallion: number, mornille: number, noise: number}}>({
    defaultValues: {
      money: getDivisions(money)
    },
  });

  const onSubmit = ({money: {gallion, mornille, noise}}: {money: {gallion: number, mornille: number, noise: number}}) => {
    pipe(
      gallion * CurrencyDivisions.gallion + mornille * CurrencyDivisions.mornille + noise,
      setMoney
    );
  };

  return (
    <form  onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <div className="flex flex-row items-center justify-start p-2 space-x-4">
          <Controller
            name="money.gallion"
            control={control}
            rules={{ required: true, min: 0 }}
            render={({value, onChange}) => (<>
              <Input
                id="inputGallions"
                value={value}
                onChange={onChange}
                onBlur={handleSubmit(onSubmit)}
                width="5ch"
                theme="neutral"
                type="number"
                min={0}
              />
              <Label htmlFor="inputGallions">
                <span style={{color: "goldenrod", fontSize: "2rem"}}>
                  <Icon name="COIN" />
                </span>
              </Label>
            </>)}
          />
          <Controller
            name="money.mornille"
            control={control}
            rules={{ required: true, min: 0 }}
            render={({value, onChange}) => (<>
              <Input
                id="inputMornilles"
                value={value}
                onChange={onChange}
                onBlur={handleSubmit(onSubmit)}
                width="5ch"
                theme="neutral"
                type="number"
                min={0}
              />
              <Label htmlFor="inputMornilles">
                <span style={{color: "silver", fontSize: "2rem"}}>
                  <Icon name="COIN" />
                </span>
              </Label>
            </>)}
          />
          <Controller
            name="money.noise"
            control={control}
            rules={{ required: true, min: 0 }}
            render={({value, onChange}) => (<>
              <Input
                id="inputNoises"
                value={value}
                onChange={onChange}
                onBlur={handleSubmit(onSubmit)}
                width="5ch"
                theme="neutral"
                type="number"
                min={0}
              />
              <Label htmlFor="inputNoises">
                <span style={{color: "#b87333", fontSize: "2rem"}}>
                  <Icon name="COIN" />
                </span>
              </Label>
            </>)}
          />
        </div>
      </Card>
    </form>
  );
}