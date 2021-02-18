import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { AppRouter } from './AppRouter';
import { config } from './config';
import { LoginCallbackPage, LoginPage } from './pages';

const client = new ApolloClient({
  uri: `${config.api.url}/graphql`,
  cache: new InMemoryCache(),
  headers: {
    authorization:
      typeof window.localStorage.token === 'string'
        ? `Bearer ${window.localStorage.token}`
        : '',
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  );
}

export default App;