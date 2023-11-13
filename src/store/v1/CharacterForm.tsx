import { Controller, useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { Label } from "../../components/font/Label";
import { IconName } from "../../components/icons/Icon";
import { Avatar } from "../../components/Avatar";

type FormType = {
  name: string;
  newName: string;
};

type Props = {
  defaultValue: string;
  names?: string[];
  callback: (value: string | undefined) => void;
};

const EMPTY = "____EMPTY____";

export function CharacterForm({ defaultValue, names = [], callback }: Props) {
  const { handleSubmit, control } = useForm<FormType>({
    defaultValues: {
      name: defaultValue,
      newName: "",
    },
  });

  const onSubmit = (formValues: FormType) => {
    callback(
      typeof formValues.name === "string" && formValues.name !== EMPTY
        ? formValues.name
        : undefined
    );
  };

  const options = [
    ...names.sort().map((name) => ({ label: name, value: name })),
    { label: "-", value: EMPTY },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-h-[75vh]">
      <Controller
        name="name"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange } }) => (
          <div className="flex flex-row items-center flex-grow p-2 border-gray-100 space-x-3 border-b-1">
            <ul className="grid grid-cols-3 md:grid-cols-5 gap-4 items-stretch justify-stretch">
              {options.map((option) => (
                <li key={option.label}>
                  <Label htmlFor={`input-name_${option.label}`}>
                    <div
                      className={`relative text-center flex flex-col gap-2 p-4 border rounded items-center ${
                        option.value === EMPTY
                          ? "border-2 border-dashed"
                          : "bg-gray-50"
                      }`}
                    >
                      <Avatar
                        url=""
                        replacementIcon={
                          option.value === EMPTY ? "DICE" : "CHARACTER"
                        }
                        text={option.label}
                        game="HP"
                      />
                      {option.value === EMPTY ? (
                        <>
                          <span className="text-gray-500">
                            Nouveau personnage
                          </span>
                          <input
                            id={`input-name_${option.label}`}
                            name="input-name"
                            className="absolute top-1 left-1"
                            onClick={() => onChange(option.value)}
                            value={option.value}
                            type="radio"
                          />
                        </>
                      ) : (
                        <>
                          {option.label}
                          <input
                            id={`input-name_${option.label}`}
                            name="input-name"
                            className="absolute top-1 left-1"
                            onClick={() => onChange(option.value)}
                            value={option.value}
                            type="radio"
                          />
                        </>
                      )}
                    </div>
                  </Label>
                </li>
              ))}
            </ul>
          </div>
        )}
      />
      <div className="mt-4 text-right">
        <Button onClick="submit" type="primary">
          Valider
        </Button>
      </div>
    </form>
  );
}
