import { ApolloError } from '@apollo/client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
  Switch,
} from 'react-router-dom';
import { MeQuery, useMeLazyQuery, useMeQuery } from '../helpers';
import {
  AppsPage,
  LoginCallbackPage,
  LoginPage,
  AppDetailsPage,
  AppNewPage,
  AppSettingsPage,
} from '../pages';
import styled from 'styled-components';
import { SettingsPage } from '../pages/AccountSettings';
import { PaymentCheckerContainer } from '../containers/PaymentCheckerContainer';
import { ProvideAuth } from './RouterAuth';
import { PrivateRoute } from './PrivateRoute';
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
          <PrivateRoute
            path={routerPath.appDetails(':id')}
            exact
            component={(props: RouteComponentProps<{ id: string }>) => {
              return <AppDetailsPage appId={props.match.params.id} />;
            }}
          ></PrivateRoute>
          <PrivateRoute
            path={routerPath.appSettings(':id')}
            exact
            component={(props: RouteComponentProps<{ id: string }>) => {
              return <AppSettingsPage appId={props.match.params.id} />;
            }}
          ></PrivateRoute>
          <PrivateRoute path={routerPath.accountSettings} exact>
            <SettingsPage />
          </PrivateRoute>

          <Route path={routerPath.authCallback(':provider')}>
            <LoginCallbackPage />
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
};
