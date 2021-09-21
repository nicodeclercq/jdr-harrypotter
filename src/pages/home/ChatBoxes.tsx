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
    width: '100%',
    pointerEvents: 'none',
    zIndex: 1,
  }}>
    {
      Object.entries(users)
        .map(([user, image]) => (
          <div key={user} title={user} style={{pointerEvents: 'auto'}}>
            <ChatBox image={image} user={user} />
          </div>
        ))
    }
  </div>;
}