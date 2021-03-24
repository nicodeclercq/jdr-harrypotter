import { useEffect, useState } from "react";
import { pipe } from "fp-ts/lib/function";
import { BehaviorSubject } from 'rxjs';

import * as V2 from './store/v2';

const retrieveState = (): Promise<V2.State> => {
  try {
    return pipe(
      window.localStorage.getItem('state'),
      currentState => currentState ? JSON.parse(currentState) : V2.defaultState,
      currentState => {
        return V2.retrieve(currentState)
      },
    );
  } catch(e) {
    console.error(e);
    return Promise.resolve(V2.defaultState);
  }
}

const subject = new BehaviorSubject<V2.State>(V2.defaultState);

retrieveState()
  .then((currentState) => subject.next(currentState));

export const useStore = () => {
  const [state, setState] = useState<V2.State>(subject.value);

  useEffect(() => {
    const subscription = subject.subscribe({next: (value) => {
      setState(value);
    }});
    return () => subscription.unsubscribe();
  },[]);

  return {
    getState: () => state,
    setState: (newState: V2.State) => {
      window.localStorage.setItem('state', JSON.stringify(newState));
      subject.next(newState);
    }
  };
}