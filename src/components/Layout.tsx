import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {useHover} from 'react-use';
import { ROUTES } from '../Router';
import { getColor } from '../theme';

function NavLink ({hovered, path, label, icon}: {hovered: boolean, path: string, label: string, icon: string;}) {
  let match = useRouteMatch({
    path,
    exact: true,
  });

  const style = {
    active: `bg-gradient-to-r ${getColor('secondary', 700, 'from:background')} ${getColor('secondary', 600, 'from:background')} ${getColor('secondary', 700, 'hover:background')} border-r-2 border-white`,
    inactive: `${getColor('secondary', 800)}  ${getColor('secondary', 700, 'hover:background')}`,
  };

  return (
    <Link to={path}>
      <div className={`flex text-4xl flex-row space-x-2 p-4 items-center ${match ? style.active : style.inactive}`}>
        <span aria-label={label}>{icon}</span>
        {hovered && <span className="text-xl">{label}</span>}
      </div>
    </Link>
  );
}

export function Layout ({ children }: { children: React.ReactNode }) {
  const [hoverable] = useHover((hovered: boolean) => (
    <div className={` ${getColor('secondary', 800 )} fixed h-full text-white divide-y divide-yellow-500`}>
      {
        ROUTES.map(({path, label, icon}) => (
          <NavLink hovered={hovered} key={path} path={path} label={label}  icon={icon}/>
        ))
      }
    </div>
  ));

  return (
    <div className="flex bg-gray-500 h-screen">
      {hoverable}
      <div className="ml-16 flex flex-grow p-6 h-screen space-x-2 justify-center items-center">
        {children}
      </div>
    </div>
  );
}