import React from 'react';
import { createPortal } from 'react-dom';

import { Icon, IconName } from '../../components/icons/Icon';
import { useSocket } from '../../useSocket';

type Props = {
  icon: IconName;
  onClick: () => void;
  color: string;
  background: string;
}

function QuickButton ({onClick, icon, color, background}: Props) {
  return <button style={{borderColor: 'currentcolor', boxShadow: '0.0625rem 0.0625rem 1rem 0.0625rem rgba(0,0,0,0.5)'}} className={`transform duration-200 hover:-translate-y-2 hover:scale-150 opacity-75 hover:opacity-100 flex justify-center items-center border-solid border-2 p-3 text-4xl rounded-full h-12 w-12 ${color} ${background}`} onClick={onClick}>
    <Icon name={icon} />
  </button>
}

export function QuickActions() {
  const { emit } = useSocket();

  return createPortal((
      <div style={{position: 'fixed', bottom: '1rem', right: '50%', transform: 'translateX(50%)'}} className="flex rounded-full flex-columns space-x-1">
        <QuickButton background="bg-orange-400" color="text-orange-900" icon="SLEEPY" onClick={() => emit({
          type: 'alert',
          payload: {
            type: 'playerIsAsleep' 
          }
        })}/>
        <QuickButton background="bg-red-400" color="text-red-900" icon="HALT" onClick={() => emit({
          type: 'alert',
          payload: {
            type: 'playerNeedsPause' 
          }
        })}/>
      </div>
    ),
    document.body
  );
}