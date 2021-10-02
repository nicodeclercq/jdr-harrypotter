import React, { useState } from 'react';
import { Card } from './Card';
import { Icon, IconName } from './icons/Icon';

type Props = {
  children: React.ReactNode;
  icon: IconName;
};

export function Info({ children, icon}: Props){
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div style={{position: 'fixed', top: '25%', right: '0', transform: isVisible ? 'translateX(0)': 'translateX(calc(100% - 1rem))', zIndex: 4, width: '50vw', transition: 'transform 0.2s ease-in-out'}}>
    <button
      onClick={() => setIsVisible(!isVisible)}
      className="flex items-center justify-center flex-grow-0 flex-shrink-0 w-12 h-12 text-2xl text-white bg-blue-500 border-2 border-white rounded-full shadow"
      style={{position:'absolute', top: '-2rem', left: '-2rem'}}
    >
      <Icon name={isVisible ? 'CROSS' : 'HELP'} />
    </button>
    <Card>
      <div className="flex flex-row items-center justify-center p-2 space-x-2">
        <div className="flex-grow text-blue-600">{children}</div>
      </div>
    </Card>
    </div>
  )
}