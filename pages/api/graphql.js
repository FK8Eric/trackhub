import { gql, ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { google } from 'googleapis';
import {
    authUrl,
    authenticate,
    createOauth2Client,
} from '../../js/backend/oauth/google';
import appConfig from '../../js/backend/appConfig';

const typeDefs = gql`
  type User {
    id: ID
  }

  type AuthResult {
    user: User
  }

  type Auth {
    url: String
    authenticate(idToken: String!): AuthResult
  }

  type Query {
      user(id: ID!): User
      currentUser: User
      auth: Auth
  }
`;

const resolvers = {
    Auth: {
        authenticate: async (parent, { idToken }) => {
            const googleUser = await authenticate(idToken);
            return {
                user: {
                    id: googleUser.user_id,
                },
            };
        },
    },
    Query: {
        user: (parent, { id }) => {
            return {
                id,
            };
        },
        currentUser: () => {
            return {
                id: 'Foo',
            };
        },
        auth: (parent, args) => {
            return {
                url: authUrl,
            };
        },
    },
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default async function handler(req, res) {

    await startServer;
    await apolloServer.createHandler({
        path: '/api/graphql',
    })(req, res);
}

export const config = {
    api: {
        bodyParser: false,
    },
};
