import { useEffect } from "react";
import { entries } from "../../helpers/object";
import { useConnectedUsers } from "../../hooks/useConnectedUsers";
import { usePersistantState } from "../../hooks/usePersistantState";

type Token = {
  x: number,
  y: number,
  name: string,
  image?: string,
};

type TokensList = Record<string, Token>;

export const useTokens = () => {
  const [tokens, setTokens] =  usePersistantState<TokensList>('BATTLEMAP_TOKENS', {});
  const { connectedUsers } = useConnectedUsers();

  useEffect(() => {
    if(connectedUsers) {
      const newTokens = entries(connectedUsers)
        .reduce((acc, [name, image]) =>
          !tokens[name]
            ? {
                ...acc,
                [name]: {
                  x: 50,
                  y: 50,
                  name,
                  image
                }
              } as TokensList
            : acc
          ,
          tokens
        );
      setTokens(newTokens);
    }
  }, [tokens, connectedUsers, setTokens]);

  return {
    tokens,
  }
}