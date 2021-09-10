// @flow
import React, { useState, type ComponentType, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

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

const Filter = ({ name, options }) => {
    return (
        <>
            <span>{name}:{' '}</span>
            <ul className="list-reset filter-options">
                {options.map((option) =>
                    <li key={option.name} className="filter-option">
                        <input type="checkbox" name={option.name} checked={option.checked} onChange={(e) => option.onChange(e.target.checked)} />
                        <label htmlFor={option.name}>{option.name}</label>
                    </li>
                )}
            </ul>

            <style jsx global>{`
      `}</style>
        </>
    );
};

type ComputedFilter = {
    property: string,
    constraint: string,
};

type Props = {
    regionId: number,
    onChange: (ComputedFilter[]) => void
};

const EventFilters: ComponentType<Props> = ({ regionId, onChange }) => {
    const [filterMap, setFilterMap] = useState(null);
    const { loading, error, data } = useQuery(GET_EVENT_FILTERS_QUERY, {
        variables: { regionId },
    });
    useEffect(() => {
        if (!data) {
            setFilterMap(null);
            return;
        }
        const newFilterMap = data.region.eventFilters.map(eventFilter => ({
            id: eventFilter.id,
            options: eventFilter.initialValues.reduce((acc, { id, checked }) => ({
                ...acc,
                [id]: checked,
            }), {}),
        })).reduce((acc, filter) => ({
            ...acc,
            [filter.id]: filter,
        }), {});

        setFilterMap(newFilterMap);
    }, [data]);
    useEffect(() => {
        if (!filterMap) {
            onChange([]);
            return;
        }
        const newFilterArray = Object.keys(filterMap).map(id => filterMap[id]).map(filter => ({
            property: filter.id,
            constraint: Object.keys(filter.options).map(id => ({ id,...filter.options[id] })).filter(option => option.checked).map(option => option.id).join(','),
        }));
        onChange(newFilterArray);
    }, [filterMap, onChange]);
    if (error) {
        console.log(error);
        return null;
    }
    if (loading || !data || !filterMap) {
        return null;
    }

    return data.region.eventFilters.map(eventFilter =>
        <div className="filter" key={eventFilter.id}>
            <Filter name={eventFilter.name} options={eventFilter.initialValues.map(({ id, name }) => ({
                name,
                checked: filterMap[eventFilter.id].options[id],
                onChange: (value) => setFilterMap(({
                    ...filterMap,
                    [eventFilter.id]: {
                        ...filterMap[eventFilter.id],
                        options: {
                            ...filterMap[eventFilter.id].options,
                            [id]: value,
                        },
                    },
                })),
            }))} />
        </div>
    );
};

export default EventFilters;
