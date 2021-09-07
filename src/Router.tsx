import React from 'react';
import { pipe } from 'fp-ts/function';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { Icon, IconName } from './components/icons/Icon';
import { keys } from './helpers/object';
import { fromRemoteData, sequence } from './helpers/remoteData';
import { ArithmancyPage } from './pages/arithmancy/arithmancyPage';
import { CartomancyPage } from './pages/cartomancy/CartomancyPage';
import { HomePage } from './pages/home/HomePage';
import { useUser } from './pages/home/useUser';
import { NotesPage } from './pages/notes/notesPage';
import { ObjectsPage } from './pages/objects/ObjectsPage';
import { PotionsPage } from './pages/potions/potionsPage';
import { RunesPage } from './pages/runes/RunesPage';
import { SkillsPage } from './pages/skills/SkillsPage';
import { SpellsPage } from './pages/spells/SpellsPage';
import { SocketMessageHandler } from './SocketMessageHandler';
import { State } from './store/State';
import { useLockKey } from './hooks/useLockKey';
import { Avatar } from './components/Avatar';

type RouteDefinition = {
  label: ((state: State) => string) | string;
  icon: IconName | ((state: State) => React.ReactElement);
  Component: () => React.ReactElement;
  lockKey?: string; 
};

export const ROUTES: Record<string, RouteDefinition> = {
  '/': {
    icon: (state: State) => state.user.imageUrl
      ? <Avatar url={state.user.imageUrl} text={state.user.name} />
      : <Icon name="SORCERER" />,
    label: (state: State) => state.user.name,
    Component: HomePage,
  },
  '/skills': {
    icon: 'SKILLS',
    label: 'Compétences',
    Component: SkillsPage
  },
  '/spells': {
    icon: 'BOOK',
    label: 'Sorts',
    Component: SpellsPage,
    lockKey: 'alohomora',
  },
  '/runes': {
    icon: 'RUNE',
    label: 'Runes',
    Component: RunesPage,
    lockKey: 'futhark',
  },
  '/cartomancy': {
    icon: 'CARD',
    label: 'Cartomancie',
    Component: CartomancyPage,
    lockKey: 'double vue',
  },
  '/arithmancy': {
    icon: 'ABACUS',
    label: 'Arithmancy',
    Component: ArithmancyPage,
    lockKey: 'pythagore',
  },
  '/objects': {
    icon: 'BACKPACK',
    label: 'Objets',
    Component: ObjectsPage,
  },
  '/notes': {
    icon: 'NOTEBOOK',
    label: 'Notes',
    Component: NotesPage,
  },
  '/potions': {
    icon: 'CAULDRON',
    label: 'Potions',
    Component: PotionsPage,
    lockKey: 'felix felicis'
  }
} as const;

const routesDefOrder: Array<keyof typeof ROUTES> = [
  '/', '/skills', '/spells', '/runes', '/cartomancy', '/arithmancy', '/potions', '/objects', '/notes'
];

export const ROUTE_NAMES = keys(ROUTES);

export const getAvailableRoutes = (unlockedKeys: State['lockKeys']) => routesDefOrder
  .filter((path) => ROUTES[path].lockKey == null || unlockedKeys.includes(ROUTES[path].lockKey as string));


function SocketMessageHandlerRenderer(){
  const { name, imageUrl } = useUser();

  return pipe(
    sequence({name, imageUrl}),
    fromRemoteData(({name, imageUrl}) => <SocketMessageHandler currentUserName={name} currentUserAvatar={imageUrl ?? ''} />),
  )
}

function RouterRenderer(){
  const { lockKeys } = useLockKey();

  return pipe(
      lockKeys,
      fromRemoteData((unlockedKeys) => <>
        <BrowserRouter>
          <Switch>
            {
              getAvailableRoutes(unlockedKeys)
                .reverse()
                .map((path) => {
                  const { Component } = ROUTES[path];
                  return (
                  <Route key={path} path={path}>
                    <Component />
                  </Route>
                )})
            }
          </Switch>
        </BrowserRouter>
      </>
    )
  )
}

export function Router() {
  return <>
    <SocketMessageHandlerRenderer />
    <RouterRenderer />
  </>;
}