import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import {
  AppDetailsPage,
  AppNewPage,
  AppSettingsPage,
  AppsPage,
  LoginCallbackPage,
  LoginPage,
} from '../pages';
import { SettingsPage } from '../pages/AccountSettings';
import { PrivateRoute } from './PrivateRoute';
import { ProvideAuth } from './RouterAuth';
import { routerPath } from './routerPath';

export const AppRouter = () => {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route path={routerPath.auth} exact>
            <LoginPage />
          </Route>
          <PrivateRoute path={routerPath.apps} exact>
            <AppsPage />
          </PrivateRoute>
          <PrivateRoute path={routerPath.newApp} exact>
            <AppNewPage />
          </PrivateRoute>
          <PrivateRoute path={routerPath.appDetails(':id')} exact>
            <AppDetailsPage />
          </PrivateRoute>
          <PrivateRoute path={routerPath.appSettings(':id')} exact>
            <AppSettingsPage />
          </PrivateRoute>
          <PrivateRoute path={routerPath.accountSettings} exact>
            <SettingsPage />
          </PrivateRoute>
          <Route path={routerPath.authCallback(':provider')}>
            <LoginCallbackPage />
          </Route>
          <Route path="*">
            <Redirect to="/apps" />
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
};
