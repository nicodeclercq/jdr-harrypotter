import React from 'react';
import { Avatar } from '../../components/Avatar';

function AvatarWrapper ({user, image}: {user: string, image: string | null | undefined}) {
  return (
    <div style={{position: 'relative', display:'flex', flexDirection: 'column', alignItems: 'center', filter:'drop-shadow(0 0.25rem 0.5rem rgba(0,0,0,0.25))'}}>
      <div style={{background: 'white', textAlign: 'center', minWidth: '8rem', padding: '0.125rem 0.5rem 1.5rem', borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem'}}>{user}</div>
      <svg
        width={92}
        height={28}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0c9.941 0 17.622 8.833 23.587 16.786C28.695 23.595 36.833 28 46 28s17.305-4.405 22.413-11.214C74.378 8.833 82.059 0 92 0H0z"
          fill="#FFFFFF"
        />
      </svg>
      <div style={{position: 'absolute', bottom: '0.25rem', left: '50%', transform: 'translateX(-50%)'}}>
        <Avatar url={image} text={user} />
      </div>
    </div>
  );
}

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
            <AvatarWrapper image={image} user={user} />
          </div>
        ))
    }
  </div>;
}