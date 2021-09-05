// @flow
import React, { useState, type ComponentType } from 'react';
import { gql, useQuery } from '@apollo/client';

import Page from '../js/components/Page';
import { desktopWidth } from '../js/styling';
import { tracks, organizers } from '../js/data';

const GET_UPCOMING_EVENTS_QUERY = gql`
    query GetUpcomingEvents($regionId: ID!) {
        region(regionId: $regionId) {
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

type Props = {};

const Home: ComponentType<Props> = () => {
    const [filters, _setFilters] = useState(initialFilters());
    const { loading, error, data } = useQuery(GET_UPCOMING_EVENTS_QUERY, {
        variables: { regionId: 'socal' },
    });
    console.log(data);

    return (
        <Page title="TrackHub - SoCal">
            <h1>Upcoming HPDE Events</h1>
            <section id="filters" className="filters">
                {filtersConfig.map((filterConfig) =>
                    <div className="filter" key={filterConfig.id}>
                        <Filter name={filterConfig.name} options={filterConfig.options.map(({ id, name }) => ({
                            name,
                            selected: id in filters[filterConfig.id] ? filters[filterConfig.id][id] : filterConfig.defaultValue,
                        }))} />
                    </div>
                )}
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
