import { gql, ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { google } from 'googleapis';
import configJson from '../../config.json';
import secretConfigJson from '../../config.secret.json';

const appConfig = {
  ...configJson,
  ...secretConfigJson,
};

const typeDefs = gql`
  type User {
    id: ID
  }

  type Auth {
    url: String
  }

  type Query {
      user(id: ID!): User
      currentUser: User
      auth: Auth
  }
`;

const oauth2Client = new google.auth.OAuth2(
  '301960945914-cees61pu2lrafj8nm7e5lbgn1v23oum0.apps.googleusercontent.com',
  appConfig.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/oauth/google',
);
const scopes = ['profile'];
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'online',
  scope: scopes,
});

const resolvers = {
    Query: {
        user: (parent, args) => {
            return {
                id: args.id,
            };
        },
        currentUser: () => {
            return {
                id: 'Foo',
            };
        },
        auth: () => {
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
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
