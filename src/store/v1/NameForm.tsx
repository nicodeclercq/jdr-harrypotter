import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { Label } from "../../components/font/Label";
import { Icon } from "../../components/icons/Icon";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";

type FormType = {
  name: string;
  newName: string;
};

type Props = {
  defaultValue: string;
  names?: string[];
  callback: (value: string) => void;
};

export function NameForm({ defaultValue, names = [], callback }: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      name: defaultValue,
      newName: "",
    },
  });

  const onSubmit = (formValues: FormType) => {
    callback(formValues.name ? formValues.name : formValues.newName);
  };

  const options = ["", ...names].map((name) =>
    name ? { label: name, value: name } : { label: "-", value: "" }
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul className="flex flex-col p-2 space-y-4">
        <li>
          <Controller
            name="name"
            control={control}
            rules={{ required: true, min: 1, max: 20 }}
            render={({ value, onChange }) => (
              <div className="flex flex-row items-center flex-grow p-2 border-gray-100 space-x-3 border-b-1">
                <Icon name="CHARACTER" />
                <Label htmlFor="input-name">Choisit ton personnage</Label>
                <Select
                  id="input-name"
                  options={options}
                  onChange={onChange}
                  value={value}
                  width="50%"
                  theme="neutral"
                />
              </div>
            )}
          />
        </li>
        <li>
          <Controller
            name="name"
            control={control}
            rules={{ required: true, min: 1, max: 20 }}
            render={({ value, onChange }) => (
              <div className="flex flex-row items-center flex-grow p-2 border-gray-100 space-x-3 border-b-1">
                <Icon name="JIGSAW_BOX" />
                <Label htmlFor="input-name">Ou crée en un nouveau</Label>
                <Input
                  id="input-name"
                  errors={errors["name"]}
                  value={value}
                  type="text"
                  theme="neutral"
                  onChange={onChange}
                  width="50%"
                  autoComplete={names ? "on" : "off"}
                />
              </div>
            )}
          />
        </li>
        <Button onClick="submit" type="primary">
          Valider
        </Button>
      </ul>
    </form>
  );
}
