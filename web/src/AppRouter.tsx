import { ApolloError } from '@apollo/client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from 'react-router-dom';
import { Navbar } from './components';
import { MeQuery, useMeLazyQuery } from './helpers';
import {
  AppsPage,
  LoginCallbackPage,
  LoginPage,
  AppDetailsPage,
  AppNewPage,
} from './pages';
import styled from 'styled-components';

interface AuthContext {
  user?: MeQuery['me'] | null;
  loading: boolean;
  called: boolean;
  error?: ApolloError;
}

const authContext = createContext<AuthContext>({
  loading: false,
  called: false,
});

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth(): AuthContext {
  const [user, setUser] = useState<AuthContext['user']>(null);
  const [loading, setLoading] = useState(false);
  const [getMe, { data, /*loading,*/ called, error }] = useMeLazyQuery(); // cannot use loading from here because it will be set to false before the user is updated

  useEffect(() => {
    setLoading(true);
    getMe();
    if (data?.me) {
      setUser(data.me);
      setLoading(false);
    }
    if (error || data?.me === null) {
      setLoading(false);
    }
  }, [getMe, data, error]);

  return {
    user,
    loading,
    called,
    error,
  };
}

const ProvideAuth: React.FunctionComponent = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const PrivateRoute: React.FunctionComponent<RouteProps> = ({
  children,
  ...rest
}) => {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.called && !auth.loading && !auth.user ? (
          <Redirect
            to={{
              pathname: '/auth',
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

const Container = styled.div`
  max-width: 860px;
  margin: auto;
  padding-top: 24px;
`;

export const AppRouter = () => {
  return (
    <ProvideAuth>
      <Navbar />
      <Container>
        <Router>
          <Switch>
            <Route path="/auth" exact>
              <LoginPage />
            </Route>
            <PrivateRoute path="/apps" exact>
              <AppsPage />
            </PrivateRoute>
            <PrivateRoute path="/app/new" exact>
              <AppNewPage />
            </PrivateRoute>
            <PrivateRoute path="/app/:id" exact>
              <AppDetailsPage />
            </PrivateRoute>
            <Route path="/auth/:provider/callback">
              <LoginCallbackPage />
            </Route>
          </Switch>
        </Router>
      </Container>
    </ProvideAuth>
  );
};
