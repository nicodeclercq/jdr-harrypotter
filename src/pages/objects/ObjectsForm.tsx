import { pipe } from "fp-ts/function";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Label } from "../../components/font/Label";
import { Input } from "../../components/Input";
import { entries, fromEntries } from "../../helpers/object";
import { useObjects } from "./useObjects";
import {
  findLastIndex,
  getDupplicates,
  removeDupplicates,
} from "../../helpers/array";
import { useRouter } from "../../hooks/useRouter";
import { EmptyContent } from "../../components/EmptyContent";

export function ObjectsForm({
  objects,
  columns,
  maxDisplayed,
}: {
  objects: Record<string, number>;
  columns: 1 | 2;
  maxDisplayed?: number | undefined;
}) {
  const { setObjects } = useObjects();
  const { goTo } = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{
    objects: { name: string; number: number }[];
  }>({
    defaultValues: {
      objects: entries(objects)
        .map(([name, number]) => ({ name, number }))
        .filter((_, index) => index < (maxDisplayed ?? Infinity)),
    },
    resolver: (values: { objects: { name: string; number: number }[] }) => {
      const names = values.objects.map(({ name }) => name);
      const namesWithoutDupplicates = removeDupplicates(names);
      const hasDupplicates = names.length > namesWithoutDupplicates.length;
      if (hasDupplicates) {
        const dupplicates = getDupplicates(names);
        return {
          values: {},
          errors: fromEntries(
            dupplicates.map((name) => [
              `objects.${findLastIndex((n) => n === name, names)}.name`,
              { type: "dupplicate" },
            ])
          ),
        };
      } else {
        return { values, errors: {} };
      }
    },
  });
  const { fields, append } = useFieldArray({
    control,
    name: "objects",
  });

  const onSubmit = ({
    objects,
  }: {
    objects: { name: string; number: number }[];
  }) => {
    pipe(
      objects
        .map(({ name, number }) => [name.trim(), number] as [string, number])
        .filter(([name, number]) => name.length > 0 && number > 0),
      fromEntries,
      setObjects
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card title="Objets">
        <div
          className={`grid gap-2 ${
            fields.length === 0 || columns === 1
              ? "grid-cols-1"
              : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {fields.length === 0 && (
            <EmptyContent>
              {{
                emoji: "BACKPACK",
                title: "Ton sac est vide !",
                description: "Au moins tu seras plus léger pour le voyage",
              }}
            </EmptyContent>
          )}
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-row items-start p-2 space-x-2"
            >
              <Controller
                name={`objects.${index}.number`}
                defaultValue={field.number}
                control={control}
                rules={{ required: true, min: 0, max: 100 }}
                render={({ field: { value, onChange } }) => (
                  <div className="flex flex-col">
                    <Label htmlFor={`${field.id}_number`}>Qté</Label>
                    <Input
                      id={`${field.id}_number`}
                      value={value}
                      onChange={onChange}
                      onBlur={handleSubmit(onSubmit)}
                      width="5ch"
                      theme="neutral"
                      type="number"
                      min={0}
                      max={100}
                    />
                  </div>
                )}
              />
              <div className="flex-grow">
                <Controller
                  name={`objects.${index}.name`}
                  defaultValue={field.name}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, name } }) => (
                    <div className="flex flex-col">
                      <Label htmlFor={`${field.id}_name`}>Nom</Label>
                      <Input
                        id={`${field.id}_name`}
                        value={value}
                        width="100%"
                        onChange={onChange}
                        onBlur={handleSubmit(onSubmit)}
                        theme="neutral"
                        type="text"
                        disabled={maxDisplayed != null}
                        // @ts-ignore
                        errors={errors[name]}
                        messages={{
                          dupplicate: `"${value}" existe déjà`,
                        }}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          ))}
        </div>
        {maxDisplayed == null && (
          <div className="flex justify-center p-2 flex-cols space-x-2">
            <Button
              type="primary"
              onClick={() => append({ name: "", number: 1 })}
            >
              Ajouter
            </Button>
          </div>
        )}
        {maxDisplayed != null && fields.length > 0 && (
          <div className="flex justify-center p-2 flex-cols space-x-2">
            <Button type="secondary" onClick={() => goTo("/objects")}>
              Voir tous les objets
            </Button>
          </div>
        )}
      </Card>
    </form>
  );
}
