import React from "react";
import * as RemoteData from "@devexperts/remote-data-ts";
import { pipe } from "fp-ts/lib/function";

import { Loader } from "../components/Loader";

const Load = () => (
  <div className="flex justify-center align-center h-full w-full">
    <Loader />
  </div>
);

export const fromRemoteData = <T, U>(remoteData: RemoteData.RemoteData<T, U>, callback: (data: U) => JSX.Element ): JSX.Element => pipe(
  remoteData,
  RemoteData.fold(
    Load,
    Load,
    Load,
    callback,
  )
);