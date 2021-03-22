import { useEffect, useState } from "react"
import { BehaviorSubject } from 'rxjs';
import { Spell } from "./pages/spells/domain/Spell";

type State = {
  userSpells: Spell[],
  uses: Record<string, number>,
};

const defaultState: State = {
  userSpells: [],
  uses: {},
};

const retrieveState = (): State => {
  try{
    const currentState = window.localStorage.getItem('state');
    return currentState ? JSON.parse(currentState) : defaultState;
  }catch(e){
    console.error(e);
    return defaultState;
  }
}
const subject = new BehaviorSubject<State>(retrieveState());

export const useStore = () => {
  const [state, setState] = useState<State>(subject.value);

  useEffect(() => {
    const subscription = subject.subscribe({next: (value) => {
      setState(value);
    }});
    return () => subscription.unsubscribe();
  },[]);

  return {
    getState: () => state,
    setState: (newState: State) => {
      window.localStorage.setItem('state', JSON.stringify(newState));
      subject.next(newState);
    }
  };
}