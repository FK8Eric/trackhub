// @flow
import React, { useState, type ComponentType } from 'react';
import { gql, useQuery } from '@apollo/client';

import Page from '../js/components/Page';
import { desktopWidth } from '../js/styling';
import EventFilters from '../js/components/EventFilters';

const GET_UPCOMING_EVENTS_QUERY = gql`
    query GetUpcomingEvents($regionId: Int!) {
        region(regionId: $regionId) {
            eventArray(filters: []) {
                id
                date
                track {
                    name
                }
                organizer {
                    name
                }
            }
        }
    }
`;

const UpcomingEvents = ({ regionId }) => {
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
            <ol className="list-reset">
                {data.region.eventArray.map(event => (
                    <li key={event.id}>
                        <p>Date: {event.date}, Track: {event.track.name}, Organizer: {event.organizer.name}</p>
                    </li>
                ))}
            </ol>
        </>
    );
};

type Props = {};

const Home: ComponentType<Props> = () => {
    const regionId = 1;
    const [filters, setFilters] = useState([]);

    return (
        <Page title="TrackHub - SoCal">
            <h1>Upcoming HPDE Events</h1>
            <section id="filters" className="filters">
                {/* <EventFilters regionId={regionId} onChange={newFilters => setFilters(newFilters)} /> */}
            </section>
            <section id="upcoming-events">
                <UpcomingEvents regionId={regionId} filters={filters} />
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
