import * as RemoteData from "@devexperts/remote-data-ts";
import { pipe } from "fp-ts/lib/function";

import { useStore } from "../../hooks/useStore";
import { State } from "../../store/State";
import { lens } from "../../helpers/object";
import { onSuccess } from "../../helpers/remoteData";

const userLens = lens<State, "user">("user");

export const useUser = () => {
  const [user, setUser] = useStore(userLens);

  const name = pipe(
    user,
    RemoteData.map(user => user.name),
  );

  const imageUrl = pipe(
    user,
    RemoteData.map(user => user.imageUrl),
  );

  const setImageUrl = (imageUrl: string) => pipe(
    user,
    onSuccess(user => setUser({...user, imageUrl}))
  );

  return {
    user,
    name,
    imageUrl,
    setImageUrl
  };
};