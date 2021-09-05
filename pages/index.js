// @flow
import React, { useState, type ComponentType } from 'react';

import Page from '../js/components/Page';
import { desktopWidth } from '../js/styling';
import { tracks, organizers } from '../js/data';

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
                        <input type="checkbox" name={option.name} value={option.name} />
                        <label htmlFor={option.name}>{option.name}</label>
                    </li>
                )}
            </ul>

            <style jsx global>{`
      `}</style>
        </>
    );
};

const _filtersConfig = [
    { id: 'tracks', name: 'Tracks', options: tracks, defaultValue: true },
    { id: 'organizers', name: 'Organizers', options: organizers, defaultValue: true },
];

const initialFilters = () => {
    return [];
};

type Props = {};

const Home: ComponentType<Props> = () => {
    const [filters, _setFilters] = useState(initialFilters());

    return (
        <Page title="TrackHub - SoCal">
            <h1>Upcoming HPDE Events</h1>
            <section id="filters" className="filters">
                {filters.map((filter) =>
                    <div className="filter" key={filter.name}>
                        <Filter {...filter} />
                    </div>
                )}
            </section>
            <section id="upcoming-events">
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
