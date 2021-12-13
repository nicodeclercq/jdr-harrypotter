import React from 'react';
import { State } from '../../store/State';
import { ChatBox } from './ChatBox';

export function ChatBoxes ({me, users}: {me: State['user'], users: Record<string, string | null | undefined>}) {
  const userList = Object.entries(users);

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
    {userList.length > 1 && (
      <div>
        <ChatBox me={me} image={undefined} user={'all'} />
      </div>
    )}
    {
      userList
        .map(([user, image]) => (
          <div key={user}>
            <ChatBox me={me} image={image} user={user} />
          </div>
        ))
    }
  </div>;
}