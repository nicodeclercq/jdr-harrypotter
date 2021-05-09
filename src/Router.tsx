import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { IconName } from './components/icons/Icon';
import { entries, keys } from './helpers/object';
import { HomePage } from './pages/home/HomePage';
import { SpellsPage } from './pages/spells/SpellsPage';

const routes: Record<string, {label: string; icon: IconName; Component: () => React.ReactElement}> = {
  '/': {
    icon: 'SORCERER',
    label: 'Accueil',
    Component: HomePage,
  },
  '/spells': {
    icon: 'BOOK',
    label: 'Sorts',
    Component: SpellsPage
  },
} as const;

const routesDefOrder: Array<keyof typeof routes> = [
  '/spells', '/'
];

export const ROUTES = entries(routes)
  .map(([path, {label, icon}]) => ({path, label, icon}));

export const ROUTE_NAMES = keys(routes);

export function Router() {
  return (
    <BrowserRouter>
      <Switch>
        {
          routesDefOrder.map((path) => {
            const { Component } = routes[path];
            return (
            <Route key={path} path={path}>
              <Component />
            </Route>
          )})
        }
      </Switch>
    </BrowserRouter>
  );
}