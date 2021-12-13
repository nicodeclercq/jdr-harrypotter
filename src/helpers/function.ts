export const noop = (..._args: unknown[]) => {};

export const tryCatch = <T>(fn: () => T, onCatch: (e: Error) => T) => {
  try{
    return fn();
  } catch(e){
    return onCatch(e);
  }
}

export const debounce = <T extends (...args: any[]) => void>(fn: T, time: number) => {
  let timeout: NodeJS.Timeout | undefined;
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout();
      timeout = undefined;
    }
    timeout = setTimeout(
      () => {
        console.log('called');
        fn.apply(null, args);
		  },
      time
    );
	};
}