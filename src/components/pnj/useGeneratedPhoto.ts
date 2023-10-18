import { useEffect, useCallback } from "react";
import { random } from "../../helpers/number";
import { usePersistantState } from "../../hooks/usePersistantState";
import { secrets } from "../../secrets";

type Props = {
  age: number;
  genre: "Homme" | "Femme";
};

const getAgeType = (age: number) => {
  if (age < 35) {
    return "young-adult";
  }
  if (age < 50) {
    return "adult";
  }
  return "elderly";
};

const getGenreType = (genre: "Homme" | "Femme") =>
  genre === "Homme" ? "male" : "female";

export const useGeneratedPhoto = ({ age, genre }: Props) => {
  const [image, setImage] = usePersistantState<string | undefined>(
    "RANDOM_PHOTO"
  );

  const generate = useCallback(({ age, genre }: Props) => {
    setImage(undefined);
    if (age != null && genre != null) {
      fetch(
        `https://api.generated.photos/api/v1/faces?api_key=${
          secrets.generatedPhotosApiKey
        }&per_page=1&age=${getAgeType(age)}&genre=${getGenreType(
          genre
        )}&order_by=random`
      )
        .then((response) => response.json())
        // @ts-ignore
        .then((response: unknown) => response.faces[0].urls[2]["128"])
        .catch((e) => {
          console.error(e);
          return `https://randomuser.me/api/portraits/${
            genre === "Homme" ? "men" : "women"
          }/${random(0, 100)}.jpg`;
        })
        .then(setImage);
    }
  }, []);

  useEffect(() => {
    if (age != null && genre != null) {
      generate({ age, genre });
    }
  }, [age, generate, genre]);

  return [image, generate] as const;
};
