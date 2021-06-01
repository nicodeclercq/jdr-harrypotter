import React from "react";
import * as RemoteData from "@devexperts/remote-data-ts";
import { sequenceS } from 'fp-ts/lib/Apply';
import { pipe } from "fp-ts/lib/function";

import { Loader } from "../components/Loader";

const Load = () => (
  <div className="flex justify-center w-full h-full align-center">
    <Loader />
  </div>
);

export const sequence = sequenceS(RemoteData.remoteData);

export const fromRemoteData = <T, U>(remoteData: RemoteData.RemoteData<T, U>, callback: (data: U) => JSX.Element ): JSX.Element => pipe(
  remoteData,
  RemoteData.fold(
    Load,
    Load,
    Load,
    callback,
  )
);