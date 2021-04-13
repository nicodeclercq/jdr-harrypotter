import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { SpellsPage } from './pages/spells/SpellsPage';

const routes: Record<string, {label: string; icon: string; Component: () => React.ReactElement}> = {
  '/spells': {
    icon: '📖',
    label: 'Sorts',
    Component: SpellsPage
  },
} as const;

const routesDefOrder: Array<keyof typeof routes> = [
  '/spells'
];

export const ROUTES = Object.entries(routes)
  .map(([path, {label, icon}]) => ({path, label, icon}));

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
        <Route exact path="/">
          <Redirect to="/spells" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}