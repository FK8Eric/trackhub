// @flow
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client: ApolloClient = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache(),
});

export default client;
