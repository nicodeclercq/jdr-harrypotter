export type Success<Data> = {
  _tag: 'success';
  value: Data;
};
export type Failure<Error> = {
  _tag: 'failure';
  error: Error;
}
export type Canceled = {
  _tag: 'canceled';
}
export type Interaction<Error, Data> = Success<Data> | Failure<Error> | Canceled;

export const isSuccess = <Error, Data>(value: Interaction<Error, Data>): value is Success<Data> => value._tag === 'success';
export const isFailure = <Error, Data>(value: Interaction<Error, Data>): value is Failure<Error> => value._tag === 'failure';
export const isCanceled = <Error, Data>(value: Interaction<Error, Data>): value is Canceled => value._tag === 'canceled';

export const success = <Data>(value: Data): Interaction<never, Data> => ({
  _tag: 'success',
  value,
});
export const failure = <Error>(error: Error): Interaction<Error, never> => ({
  _tag: 'failure',
  error,
});
export const emptyFailure = (): Interaction<never, never> => ({
  _tag: 'failure',
  error: undefined as never,
});
export const canceled = (): Interaction<never, never> => ({
  _tag: 'canceled',
});

export const fold = <Error, Data1, Data2>({success, failure, canceled}: {
  success: (value: Data1) => Data2;
  failure: (error: Error) => Data2;
  canceled: () => Data2;
}) => (data: Interaction<Error, Data1>) => {
  if(isSuccess(data)){
    return success(data.value);
  } else if(isFailure(data)) {
    return failure(data.error);
  } else {
    return canceled();
  }
};
