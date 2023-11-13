import { Controller, useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { Label } from "../../components/font/Label";
import { Input } from "../../components/Input";

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
  const { handleSubmit, control } = useForm<FormType>({
    defaultValues: {
      name: defaultValue,
      newName: "",
    },
    mode: "all",
  });

  const onSubmit = (formValues: FormType) => {
    callback(formValues.name ? formValues.name : formValues.newName);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-h-[75vh]">
      <Controller
        name="name"
        control={control}
        rules={{
          required: true,
          min: 1,
          max: 20,
          validate: (value: string) => {
            if (names.includes(value)) {
              return "Ce nom est déjà utilisé par quelqu'un d'autre...";
            }
          },
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-4">
              <Label htmlFor="input-name">Nom</Label>
              <Input
                id="input-name"
                theme="neutral"
                type="text"
                value={value}
                onChange={onChange}
              />
            </div>
            {error ? <span className="text-red-700">{error.message}</span> : ""}
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
