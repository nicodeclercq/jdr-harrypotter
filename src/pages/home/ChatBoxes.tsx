import React from 'react';
import { ChatBox } from './ChatBox';

export function ChatBoxes ({users}: { users: Record<string, string | null | undefined>}) {
  return <div style={{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-evenly',
    gap: '1rem',
    position:'fixed',
    top: '0',
    left: '0',
    width: 'calc(100% - 5rem)',
    pointerEvents: 'none',
    marginLeft: '5rem',
    zIndex: 2,
  }}>
    {
      Object.entries(users)
        .map(([user, image]) => (
          <div key={user}>
            <ChatBox image={image} user={user} />
          </div>
        ))
    }
  </div>;
}