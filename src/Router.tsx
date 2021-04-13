import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { entries } from './helpers/object';
import { SpellsPage } from './pages/spells/SpellsPage';

const routes: Record<string, () => React.ReactElement> = {
  '/spells': SpellsPage,
};

export function Router() {
  return (
    <BrowserRouter>
      <Switch>
        {
          entries(routes).map(([path, Component]) => (
            <Route key={path} path={path}>
              <Component />
            </Route>
          ))
        }
        <Route exact path="/">
          <Redirect to="/spells" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}