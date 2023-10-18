import React, { useEffect } from "react";
import { AvatarToken } from "../../components/AvatarToken";
import { Button } from "../../components/Button";
import { Layout } from "../../components/Layout";
import { entries } from "../../helpers/object";
import { useConnectedUsers } from "../../hooks/useConnectedUsers";
import { usePersistantState } from "../../hooks/usePersistantState";
import { useSocket } from "../../hooks/useSocket";
import { useTokens } from "../../hooks/useTokens";

export function BattleMapPage() {
  const { tokens, updateToken } = useTokens();
  const { connectedUsers } = useConnectedUsers();

  useEffect(() => {
    if(connectedUsers) {
      entries(connectedUsers)
        .forEach(([name, image]) => {
          if(!(name in tokens)){
            updateToken(name, {
              x: 50,
              y: 50,
              name,
              image: image ?? undefined,
            });
          }
        });
    }
  }, [tokens, connectedUsers, updateToken]);

  const [show, setShow] = usePersistantState("BATTLEMAP_SHOW", false);
  const { emit } = useSocket();

  const onDragStop = (name: string) => (newPosition: {x: number, y: number}) => {
    if(show){
      emit({
        type: "setBattleMapTokensPosition",
        payload: tokens
      });
      console.log("[YOUPI] update", {...tokens[name], ...newPosition });
      updateToken(name, {...tokens[name], ...newPosition });
    }
  };

  const addToken = () => console.log("add token");

  return (
    <Layout>
      <div className='w-full h-full' onDoubleClick={addToken}>
        <Button type='primary' onClick={() => setShow(!show)}>
          {show ? "Cacher" : "Montrer"}
        </Button>
        {
          entries(tokens).map(([name, {x, y, image}]) => (
            <AvatarToken key={name} name={name}  x={x} y={y} image={image} onDragStop={onDragStop(name)} />
          ))
        }
      </div>
    </Layout>
  );
}