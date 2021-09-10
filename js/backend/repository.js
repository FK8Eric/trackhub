// @flow
import type {
    EventId,
    EventModel,
    OrganizerId,
    OrganizerModel,
    OrganizerRegionJoinModel,
    RegionId,
    RegionModel,
    TrackId,
    TrackModel,
    TrackRegionJoinModel,
} from './models';
import { getEventsFromIcs } from './events/trackHubCalendar';
import * as hardcodedDb from './hardcodedDb';

const createLookupTable = (mockTable, keySelector) => mockTable.reduce((acc, row) => ({
    ...acc,
    [keySelector(row)]: row,
}), {});
const createJoinLookupTable = (mockTable, keySelector, joinKeySelector) => mockTable.reduce((acc, row) => ({
    ...acc,
    [keySelector(row)]: {
        ...acc[keySelector(row)],
        [joinKeySelector(row)]: row,
    },
}), {});

// $FlowFixMe
const trackHumanReadableLookupTable = createLookupTable(hardcodedDb.mockTracks, (row) => row.humanReadableId);
// $FlowFixMe
const organizerHumanReadableLookupTable = createLookupTable(hardcodedDb.mockOrganizers, (row) => row.humanReadableId);
// $FlowFixMe
const trackLookupTable = createLookupTable(hardcodedDb.mockTracks, (row) => `${row.id}`);
// $FlowFixMe
const organizerLookupTable = createLookupTable(hardcodedDb.mockOrganizers, (row) => `${row.id}`);
// $FlowFixMe
const regionLookupTable = createLookupTable(hardcodedDb.mockRegions, (row) => `${row.id}`);
// $FlowFixMe
const trackRegionLookupTable = createJoinLookupTable(hardcodedDb.mockTrackRegionJoins, (row) => `${row.trackId}`, (row) => `${row.regionId}`);
// $FlowFixMe
const organizerRegionLookupTable = createJoinLookupTable(hardcodedDb.mockOrganizerRegionJoins, (row) => `${row.organizerId}`, (row) => `${row.regionId}`);

const mapIcsEventToEventModel = (icsEvent) => {
    if (!(icsEvent.track in trackHumanReadableLookupTable)) {
        console.log(icsEvent);
        console.log(`Could not find track with humanReadableId ${icsEvent.track} in lookup table`, trackHumanReadableLookupTable);
        return null;
    }
    if (!(icsEvent.organizer in organizerHumanReadableLookupTable)) {
        console.log(icsEvent);
        console.log(`Could not find organizer with humanReadableId ${icsEvent.organizer} in lookup table`, organizerHumanReadableLookupTable);
        return null;
    }
    return {
        id: icsEvent.id,
        trackId: trackHumanReadableLookupTable[icsEvent.track].id,
        organizerId: organizerHumanReadableLookupTable[icsEvent.organizer].id,
        date: icsEvent.date,
        url: icsEvent.url,
    };
};

export const getEvents = async (regionId: RegionId, {
    organizerIds,
    trackIds,
}: { organizerIds?: OrganizerId[], trackIds?: TrackId[] } = {}): Promise<EventModel[]> => {
    const icsEvents = await getEventsFromIcs();
    return icsEvents.map(icsEvent => mapIcsEventToEventModel(icsEvent))
        .filter(event => {
            if (!event) {
                return null;
            }
            if (!(`${event.trackId}` in trackRegionLookupTable)) {
                console.log('Event', event, `with trackId ${event.trackId} not found in lookup table`, trackRegionLookupTable);
                return null;
            }
            return event && String(regionId) in trackRegionLookupTable[String(event.trackId)];
        })
        .filter(event => event)
        .filter(event => {
            if (!organizerIds) {
                return true;
            }
            return organizerIds.includes(String(event.organizerId));
        })
        .filter(event => {
            if (!trackIds) {
                return true;
            }
            return trackIds.includes(String(event.trackId));
        });
};

export const getEvent = async (eventId: EventId): Promise<EventModel> => {
    const icsEvents = await getEventsFromIcs();
    return icsEvents.map(icsEvent => mapIcsEventToEventModel(icsEvent)).filter(event => event && event.id === eventId)[0];
};

export const getTracks = async (regionId: RegionId): Promise<TrackModel[]> => {
    const trackIds = hardcodedDb.mockTrackRegionJoins.filter((join) => join.regionId === regionId).map(({ trackId }) => trackId);
    return trackIds.map(trackId => trackLookupTable[`${trackId}`]);
};

export const getTrack = async (trackId: TrackId): Promise<TrackModel> => trackLookupTable[`${trackId}`];

export const getOrganizers = async (regionId: RegionId): Promise<OrganizerModel[]> => {
    const organizerIds = hardcodedDb.mockOrganizerRegionJoins.filter((join) => join.regionId === regionId).map(({ organizerId }) => organizerId);
    return organizerIds.map(organizerId => organizerLookupTable[`${organizerId}`]);
};

export const getOrganizer = async (organizerId: OrganizerId): Promise<OrganizerModel> => organizerLookupTable[`${organizerId}`];

export const getRegions = async (): Promise<RegionModel[]> => {
    return hardcodedDb.mockRegions;
};

export const getRegion = async (regionId: RegionId): Promise<RegionModel> => regionLookupTable[`${regionId}`];
