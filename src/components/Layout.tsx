import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {useHover} from 'react-use';
import { ROUTES } from '../Router';
import { getColor } from '../theme';
import { Button } from './Button';
import { D10 } from './dice/D10';
import { D100 } from './dice/D100';
import { D4 } from './dice/D4';
import { D6 } from './dice/D6';
import { Dice } from './dice/dice';
import { RollModal } from './RollModal';
import { Icon, IconName } from '../components/Icon';

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
              <NavLink hovered={hovered} key={path} path={path} label={label}  icon={icon}/>
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
      <button className={`${getColor('secondary', 900 )} flex p-2 justify-center items-center`} onClick={() => {setRollModal(['d6', 'd6'])}}>
          <D6 value={6} size={1.5} />
          <D6 value={6} size={1.5} />
      </button>
      <button className={`${getColor('secondary', 900 )} flex p-2 justify-center items-center`} onClick={() => {setRollModal(['d10'])}}>
          <D10 value={0} size={2} />
      </button>
      <button className={`${getColor('secondary', 900 )} flex p-2 justify-center items-center`} onClick={() => {setRollModal(['d100', 'd10'])}}>
          <D100 value={0} size={1.5} />
          <D10 value={0} size={1.5} />
      </button>
    </div>
  ));

  return (
    <>
      <div className="flex bg-gray-500 h-screen">
        {hoverable}
        <div className="ml-16 h-screen w-full">
          <div className="bg-white p-1 flex flex-row justify-end">
            <Button type="secondary" onClick={() => console.log('ok')}>
              <Icon name="IMPORT" />
            </Button>
          </div>
          <div className="flex flex-grow p-6 h-full space-x-2 justify-center items-center">
            {children}
          </div>
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