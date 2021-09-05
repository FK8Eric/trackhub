// @flow
import React, { useState, type ComponentType } from 'react';
import { gql, useQuery } from '@apollo/client';

import Page from '../js/components/Page';
import { desktopWidth } from '../js/styling';
import EventFilters from '../js/components/EventFilters';

const GET_UPCOMING_EVENTS_QUERY = gql`
    query GetUpcomingEvents($regionId: ID!) {
        region(regionId: $regionId) {
            id
            organizers {
                id
                name
                url
            }
            tracks {
                id
                name
            }
            eventArray(filters: []) {
                id
                track {
                    id
                }
            }
        }
    }
`;

const UpcomingEvents = ({ events: _events, regionId }) => {
    const { loading, error, data } = useQuery(GET_UPCOMING_EVENTS_QUERY, {
        variables: { regionId },
    });
    if (error) {
        console.log(error);
        // TODO(error-handling)
        return null;
    }
    if (loading || !data) {
        // TODO(loading-handling)
        return null;
    }
    return (
        <>
            {data && JSON.stringify(data, null, '\t')}
            <ol className="list-reset">
            </ol>
        </>
    );
};

type Props = {};

const Home: ComponentType<Props> = () => {
    const regionId = 'socal';
    const [filters, setFilters] = useState([]);

    return (
        <Page title="TrackHub - SoCal">
            <h1>Upcoming HPDE Events</h1>
            <section id="filters" className="filters">
                <EventFilters regionId={regionId} onChange={newFilters => setFilters(newFilters)} />
            </section>
            <section id="upcoming-events">
                <UpcomingEvents events={[]} regionId={regionId} filters={filters} />
            </section>

            <style jsx>{`
                .filters {
                    display: flex;
                    flex-direction: column;
                }

                @media only screen and (min-width: ${desktopWidth}) {
                    .filters {
                        flex-direction: row;
                    }
                }

                .filter {
                    margin-right: 1em;
                }
            `}</style>
        </Page>
    );
};

export default Home;
