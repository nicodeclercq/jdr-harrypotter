import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {useHover} from 'react-use';
import { ROUTES } from '../Router';
import { getColor } from '../theme';
import { D10 } from './dice/D10';
import { D100 } from './dice/D100';
import { D4 } from './dice/D4';
import { D6 } from './dice/D6';
import { Dice } from './dice/dice';
import { RollModal } from './RollModal';
import { Icon, IconName } from './icons/Icon';

function NavLink ({hovered, path, label, icon}: {hovered: boolean, path: string, label: string, icon: IconName;}) {
  let match = useRouteMatch({
    path,
    exact: true,
  });

  const style = {
    active: `bg-gradient-to-r ${getColor('secondary', 600, 'from:background')} ${getColor('secondary', 400, 'to:background')} ${getColor('secondary', 700, 'hover:background')} border-r-2 border-white`,
    inactive: `${getColor('secondary', 800)}  ${getColor('secondary', 700, 'hover:background')}`,
  };

  return (
    <Link to={path}>
      <div className={`flex text-4xl flex-row space-x-2 p-4 items-center ${match ? style.active : style.inactive}`}>
        <span aria-label={label}><Icon name={icon} /></span>
        {hovered && <span className="text-xl">{label}</span>}
      </div>
    </Link>
  );
}

export function Layout ({ children }: { children: React.ReactNode }) {
  const [rollModal, setRollModal] = useState<Dice[] | undefined>(undefined);
  const [hoverable] = useHover((hovered: boolean) => (
    <div className={` ${getColor('secondary', 800 )} fixed h-full text-white divide-y divide-yellow-500 flex flex-col`}>
      <div className="flex-grow divide-y divide-yellow-500">
        {
          ROUTES.map(({path, label, icon}) => (
            <div>
              <NavLink hovered={hovered} key={`${path}_${label}`} path={path} label={label}  icon={icon}/>
            </div>
          ))
        }
      </div>
      <button className={`${getColor('secondary', 900 )} flex p-2 justify-center items-center`} onClick={() => {setRollModal(['d4'])}}>
          <D4 value={4} size={2} />
      </button>
      <button className={`${getColor('secondary', 900 )} flex p-2 justify-center items-center`} onClick={() => {setRollModal(['d6'])}}>
          <D6 value={6} size={2} />
      </button>
      <button className={`${getColor('secondary', 900 )} flex p-2 justify-center items-center`} onClick={() => {setRollModal(['d100', 'd10'])}}>
          <D100 value={40} size={1.5} />
          <D10 value={2} size={1.5} />
      </button>
    </div>
  ));

  return (
    <>
      <div className="flex h-screen bg-gray-500">
        {hoverable}
        <div className="flex items-center justify-center flex-grow h-screen p-6 ml-16 space-x-2">
          {children}
        </div>
      </div>
      {
        rollModal && <RollModal
          title={
            <span className="space-x-2">
              Lancé libre
            </span>
          }
          isCancellable={false}
          onRollEnd={() => { setRollModal(undefined)}}
          dices={rollModal}
        />
      }
    </>
  );
}