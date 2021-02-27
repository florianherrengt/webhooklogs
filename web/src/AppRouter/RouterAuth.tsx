import { ApolloError } from '@apollo/client';
import React, { createContext, useContext } from 'react';
import { MeQuery, useMeQuery } from '../helpers';

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

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth(): AuthContext {
  const meQueryResults = useMeQuery();

  return {
    user: meQueryResults.data?.me,
    ...meQueryResults,
  };
}

export const ProvideAuth: React.FunctionComponent = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
