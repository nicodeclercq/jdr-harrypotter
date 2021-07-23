import { pipe } from 'fp-ts/function';
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { IconName } from './components/icons/Icon';
import { keys } from './helpers/object';
import { fromRemoteData } from './helpers/remoteData';
import { ArithmancyPage } from './pages/arithmancy/arithmancyPage';
import { CartomancyPage } from './pages/cartomancy/CartomancyPage';
import { HomePage } from './pages/home/HomePage';
import { NotesPage } from './pages/notes/notesPage';
import { ObjectsPage } from './pages/objects/ObjectsPage';
import { PotionsPage } from './pages/potions/potionsPage';
import { RunesPage } from './pages/runes/RunesPage';
import { SkillsPage } from './pages/skills/SkillsPage';
import { SpellsPage } from './pages/spells/SpellsPage';
import { SocketMessageHandler } from './SocketMessageHandler';
import { State } from './store/State';
import { useStore } from './store/useStore';

type RouteDefinition = {
  label: string | ((state: State) => string);
  icon: IconName;
  Component: () => React.ReactElement;
  lockKey?: string; 
};

export const ROUTES: Record<string, RouteDefinition> = {
  '/': {
    icon: 'SORCERER',
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

export const getAvailableRoutes = (state: State) => routesDefOrder
  .filter((path) => ROUTES[path].lockKey == null || state.lockKeys.includes(ROUTES[path].lockKey as string));


export function Router() {
  const { getState } = useStore();

  return pipe(
    getState(),
    state => fromRemoteData(state, (s) => (
      <>
        <SocketMessageHandler currentUserName={s.user.name} />
        <BrowserRouter>
          <Switch>
            {
              getAvailableRoutes(s)
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
    )),
  );
}