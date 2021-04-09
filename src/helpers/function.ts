export const noop = () => {};

export const tryCatch = <T>(fn: () => T, onCatch: (e: Error) => T) => {
  try{
    return fn();
  } catch(e){
    return onCatch(e);
  }
}