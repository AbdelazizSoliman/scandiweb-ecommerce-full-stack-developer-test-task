import { Component } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const graphqlEndpoint = import.meta.env.PROD
  ? '/graphql'
  : 'http://localhost:8000/graphql';

const apolloClient = new ApolloClient({
  uri: graphqlEndpoint,
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <RouterProvider router={router}></RouterProvider>
      </ApolloProvider>
    );
  }
}

export default App;
