import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { TypeofItems } from "../../helpers/array";
import { Label } from "../../components/font/Label";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";
import { State } from "../../store/State";
import { TypeofDefined } from "../../helpers/nullable";

type NumberType = TypeofDefined<TypeofItems<State["arithmancy"]["numbers"]>>;

function NameNumber({ onSubmit }: { onSubmit: (result: {value: string}) => void}) {
  const { handleSubmit, control } = useForm<{value: string}>();

  return (
    <form className="flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="value"
        control={control}
        rules={{ required: true, minLength: 1 }}
        render={({value, onChange}) => (<>
          <Label htmlFor="value">Définition</Label>
          <Input
            id={"value"}
            value={value}
            onChange={onChange}
            onBlur={handleSubmit(onSubmit)}
            width="100%"
            theme="neutral"
            type="text"
          />
        </>)}
      />
    </form>
  );
}

function VerbNumber({onSubmit}: { onSubmit: (result: {value: string, invert: string}) => void}) {
  const { handleSubmit, control } = useForm<{value: string, invert: string}>();

  return (
    <form className="flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="value"
        control={control}
        rules={{ required: true, minLength: 1 }}
        render={({value, onChange}) => (<>
          <Label htmlFor="value">Définition</Label>
          <Input
            id={"value"}
            value={value}
            onChange={onChange}
            onBlur={handleSubmit(onSubmit)}
            width="100%"
            theme="neutral"
            type="text"
          />
        </>)}
      />
      <Controller
        name="invert"
        control={control}
        rules={{ required: true, minLength: 1 }}
        render={({value, onChange}) => (<>
          <Label htmlFor="value">Inverse</Label>
          <Input
            id={"invert"}
            value={value}
            onChange={onChange}
            onBlur={handleSubmit(onSubmit)}
            width="100%"
            theme="neutral"
            type="text"
          />
        </>)}
      />
    </form>
  );
}

function InverseNumber({onSubmit}: { onSubmit: () => void}) {
  useEffect(onSubmit, [onSubmit]);
  return (<></>);
}
export function NumberDefinitionForm({ onSubmit }: { onSubmit: (result: NumberType) => void }) {
  const [type, setType] = useState<NumberType["type"] | undefined>(undefined);
  const [value, setValue] = useState<NumberType | undefined>(undefined);

  return (<div className="flex flex-col space-y-2">
    <Label htmlFor="input-type">Type</Label>
    <Select
      id="input-type"
      options={[
        {label: "-", value: "" },
        {label: "Nom", value: "name" },
        {label: "Verbe", value: "verb" },
        {label: "Inverse", value: "inverse"},
      ]}
      onChange={(value) => {
        setType(value === "" ? undefined : value as NumberType["type"]);
      }}
    />
    {
      type === "name" ? <NameNumber onSubmit={(result) => setValue({type: "name", ...result})}/>
        : type === "verb" ? <VerbNumber onSubmit={(result) => setValue({type: "verb", ...result})}/>
          : type === "inverse" ? <InverseNumber onSubmit={() => setValue({type: "inverse"})}/>
            : <></>
    }
    <Button
      type="primary"
      onClick={() => onSubmit(value as NumberType)}
    >
      Valider
    </Button>
  </div>);
}