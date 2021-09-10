// @flow
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client: ApolloClient = new ApolloClient({
    uri: `${window.location.origin}/api/graphql`,
    cache: new InMemoryCache(),
});

export default client;
