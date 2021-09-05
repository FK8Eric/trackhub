// @flow
import { gql, ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import {
    authUrl,
    authenticate,
} from '../../js/backend/oauth/google';
import {
    getEvent,
    getEvents,
    getOrganizer,
    getOrganizers,
    getRegion,
    getRegions,
    getTrack,
    getTracks,
} from '../../js/backend/repository';
import type { RequestHandler } from '../../js/backend/types';

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

    type Track {
        id: ID
        name: String
        location: String
    }

    input FilterInput {
        property: String
        constraint: String
    }

    type Organizer {
        id: ID
        name: String
        url: String
    }

    type Event {
        id: ID
        track: Track
        organizer: Organizer
        date: String
    }

    type EventFilterValue {
        id: ID
        name: String
        checked: Boolean
    }

    type EventFilter {
        id: ID
        name: String
        initialValues: [EventFilterValue]
    }

    type Region {
        id: ID
        name: String

        eventFilters: [EventFilter]
        eventArray(filters: [FilterInput]): [Event]
        organizers: [Organizer]
        tracks: [Track]
    }

    type Query {
        user(id: ID!): User
        currentUser: User
        auth: Auth
        regions(filters: [FilterInput]): [Region]
        region(regionId: ID): Region
    }
`;

const resolvers = {
    Event: {
        date: (parent, args) => {
            return getEvent(parent.id).date.toISOString().split('T')[0];
        },
    },
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
    Track: {
        name: ({ id }, args) => {
            return getTrack(id).name;
        },
        location: ({ id }, args) => {
            return getTrack(id).location;
        },
    },
    Organizer: {
        name: ({ id }, args) => {
            return getOrganizer(id).name;
        },
        url: ({ id }, args) => {
            return getOrganizer(id).url;
        },
    },
    Region: {
        name: ({ id }, args) => {
            return getRegion(id).name;
        },
        eventFilters: ({ id }) => {
            return [
                {
                    id: 'tracks',
                    name: 'Tracks',
                    initialValues: getTracks(id).map(trackModel => ({
                        id: trackModel.id,
                        name: trackModel.name,
                        checked: true,
                    })),
                },
                {
                    id: 'organizers',
                    name: 'Organizers',
                    // TODO: Get additional organizers based on tracks in the region, not just organizers in the region
                    // It is possible for organizers to organize one-off events outside of their usual region
                    initialValues: getOrganizers(id).map(organizerModel => ({
                        id: organizerModel.id,
                        name: organizerModel.name,
                        checked: true,
                    })),
                },
            ];
        },
        eventArray:({ id }, { filters }) => {
            const processedFilters = filters.map(({ property, constraint }) => {
                switch (property) {
                case 'tracks':
                    return {
                        trackIds: constraint.split(','),
                    };
                case 'organizers':
                    return {
                        organizerIds: constraint.split(','),
                    };
                default:
                    return null;
                }
            })
                .filter(filter => filter)
                .reduce((acc, filter) => ({
                    ...acc,
                    ...filter,
                }), {});
            const events = getEvents(id, processedFilters);

            return events.map(event => ({
                id: event.id,
                track: { id: event.trackId },
                organizer: { id: event.organizerId },
            }));
        },
        organizers: (region, args) => {
            return getOrganizers(region.id).map(({ id }) => ({ id }));
        },
        tracks: (region, args) => {
            return getTracks(region.id).map(({ id }) => ({ id }));
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
        auth: (_parent, _args) => {
            return {
                url: authUrl,
            };
        },
        regions: (parent, { filters }) => {
            return getRegions().map(({ id }) => ({ id }));
        },
        region: (parent, { regionId }) => {
            return { id: regionId };
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

const handler: RequestHandler = async (req, res) => {

    await startServer;
    await apolloServer.createHandler({
        path: '/api/graphql',
    })(req, res);
};

export default handler;

export const config = {
    api: {
        bodyParser: false,
    },
};
