// @flow
import React, { useState, type ComponentType } from 'react';
import { gql, useQuery } from '@apollo/client';

import Page from '../js/components/Page';
import { desktopWidth } from '../js/styling';
import { tracks, organizers } from '../js/data';

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

const GET_EVENT_FILTERS_QUERY = gql`
    query GetEventFilters($regionId: ID!) {
        region(regionId: $regionId) {
            id
            eventFilters {
                id
                name
                initialValues {
                    id
                    name
                    checked
                }
            }
        }
    }
`;

const UpcomingEvents = ({ events: _events }) => {
    return (
        <ol className="list-reset">
        </ol>
    );
};

const Filter = ({ name, options }) => {
    return (
        <>
            <span>{name}:{' '}</span>
            <ul className="list-reset filter-options">
                {options.map((option) =>
                    <li key={option.name} className="filter-option">
                        <input type="checkbox" name={option.name} value={option.selected} />
                        <label htmlFor={option.name}>{option.name}</label>
                    </li>
                )}
            </ul>

            <style jsx global>{`
      `}</style>
        </>
    );
};

const filtersConfig = [
    { id: 'tracks', name: 'Tracks', options: tracks, defaultValue: true },
    { id: 'organizers', name: 'Organizers', options: organizers, defaultValue: true },
];

const initialFilters = () => {
    return {
        tracks: {},
        organizers: {},
    };
};

const Filters = ({ regionId }) => {
    const { loading, error, data } = useQuery(GET_EVENT_FILTERS_QUERY, {
        variables: { regionId },
    });
    if (error) {
        console.log(error);
        return null;
    }
    if (loading || !data) {
        return null;
    }

    return data.region.eventFilters.map(eventFilter =>
        <div className="filter" key={eventFilter.id}>
            <Filter name={eventFilter.name} options={eventFilter.initialValues.map(({ id, name, checked }) => ({
                name,
                selected: checked,
            }))} />
        </div>
    );
};

type Props = {};

const Home: ComponentType<Props> = () => {
    const regionId = 'socal';
    const [filters, _setFilters] = useState(initialFilters());
    const { loading, error, data } = useQuery(GET_UPCOMING_EVENTS_QUERY, {
        variables: { regionId },
    });
    console.log(data);

    return (
        <Page title="TrackHub - SoCal">
            <h1>Upcoming HPDE Events</h1>
            <section id="filters" className="filters">
                <Filters regionId={regionId} />
            </section>
            <section id="upcoming-events">
                {data && JSON.stringify(data, null, '\t')}
                <UpcomingEvents events={[]} />
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
