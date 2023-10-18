import { useCallback, useEffect } from "react";
import { BehaviorSubject } from "rxjs";
import { usePersistantRecordState } from "./usePersistantRecordState";

type Token = {
  x: number,
  y: number,
  name: string,
  image: string | undefined,
};

const subject = new BehaviorSubject<Record<string, Token>>({});

export const useTokens = () => {
  const {record: tokens, set: setTokens} =  usePersistantRecordState<Token>("BATTLEMAP_TOKENS");
  
  useEffect(() => {
    const subscription = subject.asObservable()
      .subscribe(setTokens);

    return () => subscription.unsubscribe();
  },[setTokens]);

  const updateToken = useCallback((name: string, newToken: Token) => {
    subject.next({...subject.value, [name]: newToken});
  }, []);

  return {
    tokens,
    setTokens,
    updateToken,
  };
};