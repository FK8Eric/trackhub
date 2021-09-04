import { useState } from 'react';
import Head from 'next/head';
import Page from '../src/components/Page/Page';
import { desktopWidth } from '../src/styling';
import { tracks, organizers } from '../src/data';

const UpcomingEvents = ({ events }) => {
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
            <label for={option.name}>{option.name}</label>
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
  return [];
};

const Home = () => {
  const [filters, setFilters] = useState(initialFilters());

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
