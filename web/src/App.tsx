import './App.scss';

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  split,
  HttpLink,
} from '@apollo/client';
import React from 'react';
import { AppRouter } from './AppRouter';
import { config } from './config';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const authorization =
  typeof window.localStorage.token === 'string'
    ? `Bearer ${window.localStorage.token}`
    : '';

const httpLink = new HttpLink({
  uri: `${config.api.protocol}://${config.api.url}/graphql`,
  headers: {
    authorization,
  },
});

const wsLink = new WebSocketLink({
  uri: `${config.ws.protocol}://${config.api.url}/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authorization,
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  uri: `http://${config.api.url}/graphql`,
  link: splitLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  );
}

export default App;
