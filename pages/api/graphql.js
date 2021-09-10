// @flow
import { gql, ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import {
    authUrl,
    authenticate,
} from '../../js/backend/oauth/google';
import {
    getEventsFromIcs,
} from '../../js/backend/events/trackHubCalendar';
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
        id: Int
    }

    type AuthResult {
        user: User
    }

    type Auth {
        url: String
        authenticate(idToken: String!): AuthResult
    }

    type Track {
        id: Int
        name: String
        location: String
    }

    input FilterInput {
        property: String
        constraint: String
    }

    type Organizer {
        id: Int
        name: String
        url: String
    }

    type Event {
        id: Int
        track: Track
        organizer: Organizer
        date: String
        url: String
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
        id: Int
        name: String

        eventFilters: [EventFilter]
        eventArray(filters: [FilterInput]): [Event]
        organizers: [Organizer]
        tracks: [Track]
    }

    type Query {
        user(id: Int!): User
        currentUser: User
        auth: Auth
        regions(filters: [FilterInput]): [Region]
        region(regionId: Int!): Region
    }
`;

const resolvers = {
    Event: {
        date: async (parent, args) => {
            return (await getEvent(parent.id)).date.toISOString().split('T')[0];
        },
        url: async (parent, args) => {
            return (await getEvent(parent.id)).url;
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
        name: async ({ id }, args) => {
            return (await getTrack(id)).name;
        },
        location: async ({ id }, args) => {
            return (await getTrack(id)).location;
        },
    },
    Organizer: {
        name: async ({ id }, args) => {
            return (await getOrganizer(id)).name;
        },
        url: async ({ id }, args) => {
            return (await getOrganizer(id)).url;
        },
    },
    Region: {
        name: async ({ id }, args) => {
            return (await getRegion(id)).name;
        },
        eventFilters: async ({ id }) => {
            return [
                {
                    id: 'tracks',
                    name: 'Tracks',
                    initialValues: (await getTracks(id)).map(trackModel => ({
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
                    initialValues: (await getOrganizers(id)).map(organizerModel => ({
                        id: organizerModel.id,
                        name: organizerModel.name,
                        checked: true,
                    })),
                },
            ];
        },
        eventArray: async ({ id }, { filters }) => {
            const processedFilters = (filters || []).map(({ property, constraint }) => {
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
            const events = await getEvents(id, processedFilters);

            return events.map(event => ({
                id: event.id,
                track: { id: event.trackId },
                organizer: { id: event.organizerId },
            }));
        },
        organizers: async (region, args) => {
            return (await getOrganizers(region.id)).map(({ id }) => ({ id }));
        },
        tracks: async (region, args) => {
            return (await getTracks(region.id)).map(({ id }) => ({ id }));
        },
    },
    Query: {
        user: (parent, { id }) => {
            return {
                id,
            };
        },
        currentUser: async () => {
            await getEventsFromIcs();
            return {
                id: 'Foo',
            };
        },
        auth: (_parent, _args) => {
            return {
                url: authUrl,
            };
        },
        regions: async (parent, args) => {
            return (await getRegions()).map(({ id }) => ({ id }));
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
