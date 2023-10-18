import React, { useMemo } from "react";
import { State } from "../../store/State";
import { ChatBox } from "./ChatBox";

export function ChatBoxes ({me, users}: {me: State["user"], users: Record<string, string | null | undefined>}) {
  const userList = useMemo(() => Object.entries(users), [users]);

  return <ul style={{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent: "space-evenly",
    gap: "0.25rem",
    position:"fixed",
    top: "0",
    left: "0",
    width: "calc(100% - 5rem)",
    pointerEvents: "none",
    marginLeft: "5rem",
    zIndex: 2,
    overflowX: "auto",
  }}>
    {userList.length > 1 && (
      <ChatBox as="li" me={me} image={undefined} user={"all"} />
    )}
    {
      userList
        .map(([user, image]) => (
          <ChatBox key={user} as="li" me={me} image={image} user={user} />
        ))
    }
  </ul>;
}