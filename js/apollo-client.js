// @flow
import { ApolloClient, InMemoryCache } from '@apollo/client';

// $FlowFixMe
const origin = process && process.browser && window ? window.location.origin : (process && process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://trackhub.ca');

const client: ApolloClient = new ApolloClient({
    uri: `${origin}/api/graphql`,
    cache: new InMemoryCache(),
});

export default client;
