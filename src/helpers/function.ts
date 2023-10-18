type Fn<Args extends unknown[], Result> = (...args: Args) => Result;

export const noop: Fn<unknown[], void> = () => {};

export const tryCatch = <T>(fn: () => T, onCatch: (e: Error) => T) => {
  try {
    return fn();
  } catch (e) {
    return onCatch(e instanceof Error ? e : new Error(`${e}`));
  }
};

export const debounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  time: number
) => {
  let timeout: NodeJS.Timeout | undefined;
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }
    timeout = setTimeout(() => {
      fn(...args);
    }, time);
  };
};
