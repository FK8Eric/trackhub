import ical from 'node-ical';
import appConfig from '../appConfig';

const regex = /^(.*): (.*)$/;

const parseDescription = (description) => {
    return description.split('\n').map(line => {
        const [_, key, value] = regex.exec(line);
        return [key, value];
    }).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value,
    }), {});
};

export type IcsEvent = {
    id: number,
    /** humanReadableId */
    track: string,
    /** humanReadableId */
    organizer: string,
    /** humanReadableId */
    configuration?: string,
    date: Date,
};

export const getEventsFromIcs = async (): IcsEvent[] => {
    let events = await ical.async.fromURL(appConfig.ICS_URL);

    events = Object.keys(events).map(key => events[key]);
    events = events.filter(({ description }) => description.startsWith('track:'));
    events.sort((a, b) => {
        if (a.start < b.start) {
            return -1;
        } else if (a.start > b.start) {
            return 1;
        }
        return 0;
    });
    events = events.map((event, index) => {
        const parsedFields = parseDescription(event.description);
        return {
            ...parsedFields,
            id: index + 1,
            date: event.start,
        };
    });

    return events;
};
