import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {useHover} from 'react-use';
import { identity, pipe } from 'fp-ts/function';

import { getAvailableRoutes, ROUTES } from '../Router';
import { getColor } from '../theme';
import { D10 } from './dice/D10';
import { D100 } from './dice/D100';
import { D4 } from './dice/D4';
import { D6 } from './dice/D6';
import { Dice } from './dice/dice';
import { RollModal } from './RollModal';
import { Icon, IconName } from './icons/Icon';
import { useStore } from '../hooks/useStore';
import { fromRemoteData, sequence } from '../helpers/remoteData';
import { State } from '../store/State';
import { useLockKey } from '../hooks/useLockKey';
import { QuickActions } from '../pages/home/QuickActions';
import { useRole } from '../hooks/useRole';
import { ImagePreview } from './ImagePreview';

function NavLink ({hovered, path, label, icon}: {hovered: boolean, path: string, label: string, icon: IconName | React.ReactElement;}) {
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
      <div className={`flex text-4xl flex-row space-x-2 py-2 px-4 items-center ${match ? style.active : style.inactive}`}>
        {typeof icon === 'string' ? <span aria-label={label}><Icon name={icon} /></span> : icon}
        {hovered && <span className="text-xl">{label}</span>}
      </div>
    </Link>
  );
}

const displayLabel = (label: string | ((state: State) => string), state: State) => {
  if(typeof label === 'string'){
    return label;
  }

  return label(state);
}

const displayIcon = (icon: IconName | ((state: State) => React.ReactElement), state: State) => {
  if(typeof icon === 'string'){
    return icon;
  }

  return icon(state);
}

export function Layout ({ children }: { children: React.ReactNode }) {
  const { lockKeys } = useLockKey();
  const { role } = useRole();
  const [state] = useStore([
    identity,
    (state: State, newState: State) => newState,
  ]);

  const [rollModal, setRollModal] = useState<Dice[] | undefined>(undefined);
  const [hoverable] = useHover((hovered: boolean) => pipe(
    sequence({
      role,
      lockKeys,
      state,
    }),
    fromRemoteData(({lockKeys, state, role}) => (
      <div className={` ${getColor('secondary', 800 )} fixed h-full text-white divide-y divide-blue-500 flex flex-col`} style={{zIndex: 2}}>
        <div className="flex-grow overflow-y-auto divide-y divide-blue-500">
          {
            getAvailableRoutes(lockKeys, role)
              .map(path => ({path, ...ROUTES[path]}))
              .map(({path, label, icon}) => ({
                path,
                label: displayLabel(label, state),
                icon: displayIcon(icon, state),
              }))
              .map(({path, label, icon}) => (
                <div key={`${path}_${label}`}>
                  <NavLink hovered={hovered} path={path} label={label}  icon={icon}/>
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
    )),
  ));

  return (
    <>
      <div className="flex h-screen overflow-y-auto bg-gray-500">
        {hoverable}
        <div className="flex items-center justify-center flex-grow h-screen p-6 mt-16 ml-16 space-x-2">
          <ImagePreview />
          <div className="flex items-center justify-center flex-grow h-screen p-6 mt-16 ml-16 space-x-2" style={{zIndex: 1}}>{children}</div>
        </div>
      </div>
      {
        rollModal && <RollModal
          title="Lancé libre"
          isCancellable={false}
          onRollEnd={() => { setRollModal(undefined)}}
          dices={rollModal}
        />
      }
      <QuickActions />
    </>
  );
}