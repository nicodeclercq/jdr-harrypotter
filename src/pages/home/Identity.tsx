import React from "react";
import { pipe } from "fp-ts/function";
import { State } from "../../store/State";
import { Icon } from "../../components/icons/Icon";
import { Card } from "../../components/Card";
import { Title } from "../../components/font/Title";
import { useLife } from "./useLife";
import { fromRemoteData, sequence } from "../../helpers/remoteData";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import { Avatar } from "../../components/Avatar";
import { useUser } from "./useUser";
import { prompt } from "../../helpers/io";
import { Button } from "../../components/Button";
import { useLuckPoints } from "./useLuckPoints";
import { Separator } from "../../components/Separator";

type FormType = {
  current: number;
  max: number;
  luck: number;
};

function LifeForm({
  current,
  max,
  luckPoints,
}: State["life"] & { luckPoints: State["luckPoints"] }) {
  const { setLife } = useLife();
  const { setLuckPoints } = useLuckPoints();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: { current, max, luck: luckPoints },
  });

  const onSubmit = ({ current, max, luck }: FormType) => {
    setLife({ current: current * 1, max: max * 1 });
    setLuckPoints(luck);
  };

  return (
    <form className="space-x-2" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="current"
        control={control}
        rules={{ required: true, min: 1, max: 30 }}
        render={({ field: { value, onChange } }) => (
          <Input
            id="input-life_current"
            errors={errors["current"]}
            value={value}
            type="number"
            min="0"
            max="30"
            theme="neutral"
            onChange={onChange}
            onBlur={handleSubmit(onSubmit)}
            size={1}
          />
        )}
      />
      <span>/</span>
      <Controller
        name="max"
        control={control}
        rules={{ required: true, min: 1, max: 30 }}
        render={({ field: { value, onChange } }) => (
          <Input
            id="input-life_max"
            errors={errors["max"]}
            value={value}
            type="number"
            min="0"
            max="30"
            theme="neutral"
            onChange={onChange}
            onBlur={handleSubmit(onSubmit)}
            size={1}
          />
        )}
      />
      <span className="text-red-400">
        <Icon name="HEART" />
      </span>
      <Separator isVertical />

      <span className="text-green-400">
        <Icon name="DICE" />
      </span>
      <Controller
        name="luck"
        control={control}
        rules={{ required: true, min: 0, max: 500 }}
        render={({ field: { value, onChange } }) => (
          <Input
            id="input-luck_current"
            errors={errors["luck"]}
            value={value}
            type="number"
            min="0"
            max="500"
            theme="neutral"
            onChange={onChange}
            onBlur={handleSubmit(onSubmit)}
            size={1}
          />
        )}
      />
    </form>
  );
}

function ImageUrlForm({
  imageUrl,
  onSubmit,
}: {
  imageUrl: string;
  onSubmit: (result: { imageUrl: string }) => void;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ imageUrl: string }>({
    defaultValues: { imageUrl },
  });

  return (
    <form
      className="flex items-center space-x-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="imageUrl"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            id="input-image_url"
            errors={errors["imageUrl"]}
            value={value}
            type="text"
            theme="neutral"
            onChange={onChange}
            width="100%"
          />
        )}
      />
      <Button type="primary" onClick={handleSubmit(onSubmit)}>
        Valider
      </Button>
    </form>
  );
}

export function Identity() {
  const { life } = useLife();
  const { luckPoints } = useLuckPoints();
  const { name, imageUrl, setImageUrl } = useUser();

  return pipe(
    sequence({ name, life, imageUrl, luckPoints }),
    fromRemoteData(({ name, life, imageUrl, luckPoints }) => (
      <Card>
        <div className="flex p-2 flex-column space-y-4">
          <div className="flex flex-row flex-wrap items-center w-full space-x-2">
            <div className="flex-grow">
              <Title>
                <div className="flex items-center space-x-2">
                  <Avatar
                    text={name}
                    url={imageUrl}
                    onClick={() =>
                      prompt<{ imageUrl: string }>(
                        (callback) => (
                          <ImageUrlForm
                            imageUrl={imageUrl ?? ""}
                            onSubmit={callback}
                          />
                        ),
                        "Choisis ton avatar"
                      ).then(({ imageUrl }) => setImageUrl(imageUrl))
                    }
                    icon="PEN"
                  />
                  <span>{name}</span>
                </div>
              </Title>
            </div>
            <LifeForm
              current={life.current}
              max={life.max}
              luckPoints={luckPoints}
            />
          </div>
        </div>
      </Card>
    ))
  );
}
