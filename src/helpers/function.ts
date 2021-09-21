export const noop = (..._args: unknown[]) => {};

export const tryCatch = <T>(fn: () => T, onCatch: (e: Error) => T) => {
  try{
    return fn();
  } catch(e){
    return onCatch(e);
  }
}