import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from './RouterAuth';

export const PrivateRoute: React.FunctionComponent<RouteProps> = ({
  children,
  ...rest
}) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        console.log(auth.called && !auth.loading && !auth.user, { auth });
        return auth.called && !auth.loading && !auth.user ? (
          <Redirect
            to={{
              pathname: '/auth',
              state: { from: location },
            }}
          />
        ) : (
          children
        );
      }}
    />
  );
};
