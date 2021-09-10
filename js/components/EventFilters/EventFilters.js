// @flow
import React, { useState, type ComponentType, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_EVENT_FILTERS_QUERY = gql`
    query GetEventFilters($regionId: Int!) {
        region(regionId: $regionId) {
            id
            eventFilters {
                id
                name
                initialValues {
                    valueId
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
    const updateFilterMap = (newFilterMap) => {
        setFilterMap(newFilterMap);
        const newFilterArray = Object.keys(newFilterMap).map(id => newFilterMap[id]).map(filter => ({
            property: filter.id,
            constraint: Object.keys(filter.options)
                .map(id => ({ id: parseInt(id), ...filter.options[String(id)] }))
                .filter(option => option.checked)
                .map(option => option.id).join(','),
        }));
        onChange(newFilterArray);
    };
    useEffect(() => {
        if (!data) {
            setFilterMap(null);
            onChange([]);
            return;
        }
        const newFilterMap = data.region.eventFilters.map(eventFilter => ({
            id: eventFilter.id,
            options: eventFilter.initialValues.reduce((acc, option) => ({
                ...acc,
                [String(option.valueId)]: {
                    id: option.valueId,
                    name: option.name,
                    checked: option.checked,
                },
            }), {}),
        })).reduce((acc, filter) => ({
            ...acc,
            [filter.id]: filter,
        }), {});
        console.log(data);
        console.log(newFilterMap);

        updateFilterMap(newFilterMap);
    }, [data]);
    if (error) {
        console.log(error);
        return null;
    }
    if (loading || !data || !filterMap) {
        return null;
    }

    return data.region.eventFilters.map(eventFilter =>
        <div className="filter" key={eventFilter.id}>
            <Filter name={eventFilter.name} options={eventFilter.initialValues.map(({ valueId: id, name }) => ({
                name,
                checked: filterMap[eventFilter.id].options[String(id)].checked,
                onChange: (value) => {
                    const updatedOption = {
                        ...filterMap[eventFilter.id].options[String(id)],
                        checked: value,
                    };
                    const updatedOptions = {
                        ...filterMap[eventFilter.id].options,
                        [String(id)]: updatedOption,
                    };
                    updateFilterMap({
                        ...filterMap,
                        [eventFilter.id]: {
                            ...filterMap[eventFilter.id],
                            options: updatedOptions,
                        },
                    });
                },
            }))} />
        </div>
    );
};

export default EventFilters;
