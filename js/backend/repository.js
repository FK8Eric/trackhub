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

const mockRegions: {[RegionId]:RegionModel} = {
    socal: {
        id: 'socal',
        name: 'SoCal',
    },
    norcal: {
        id: 'norcal',
        name: 'NorCal',
    },
};

const mockTracks: {[TrackId]:TrackModel} = {
    buttonwillow: {
        id: 'buttonwillow',
        name: 'Buttonwillow Raceway Park',
        location: 'Buttonwillow, CA',
    },
    streetsofwillow: {
        id: 'streetsofwillow',
        name: 'Streets of Willow',
        location: 'Rosamond, CA',
    },
    bigwillow: {
        id: 'bigwillow',
        name: 'Big Willow',
        location: 'Rosamond, CA',
    },
    chuckwalla: {
        id: 'chuckwalla',
        name: 'Chuckwalla Valley Raceway',
        location: 'Desert Center, CA',
    },
    autoclubspeedway: {
        id: 'autoclubspeedway',
        name: 'Auto Club Speedway',
        location: 'Fontana, CA',
    },
};

const mockTrackRegionJoins: TrackRegionJoinModel[] = [
    { trackId: 'buttonwillow', regionId: 'socal' },
    { trackId: 'streetsofwillow', regionId: 'socal' },
    { trackId: 'bigwillow', regionId: 'socal' },
    { trackId: 'chuckwalla', regionId: 'socal' },
    { trackId: 'autoclubspeedway', regionId: 'socal' },
    { trackId: 'buttonwillow', regionId: 'norcal' },
];

const mockOrganizers: {[OrganizerId]:OrganizerModel} = {
    speedventures: {
        id: 'speedventures',
        name: 'Speed Ventures',
        url: 'https://www.speedventures.com/',
    },
    extremespeedtrackevents: {
        id: 'extremespeedtrackevents',
        name: 'Extreme Speed Track Events',
        url: 'https://www.extremespeedtrackevents.com/',
    },
    turn8racing: {
        id: 'turn8racing',
        name: 'Turn 8 Racing',
        url: 'https://www.turn8racing.com/',
    },
    ongridtrack: {
        id: 'ongrid',
        name: 'OnGrid Track',
        url: 'https://www.ongridtrack.com/',
    },
    speedsf: {
        id: 'speedsf',
        name: 'SpeedSF',
        url: 'https://www.speedsf.com/',
    },
};

const mockOrganizerRegionJoins: OrganizerRegionJoinModel[] = [
    { organizerId: 'speedventures', regionId: 'socal' },
    { organizerId: 'extremespeedtrackevents', regionId: 'socal' },
    { organizerId: 'turn8racing', regionId: 'socal' },
    { organizerId: 'ongridtrack', regionId: 'socal' },
    { organizerId: 'speedsf', regionId: 'norcal' },
];

const mockEvents: {[string]: EventModel} = {
    '1': {
        id: 1,
        trackId: 'buttonwillow',
        organizerId: 'speedventures',
        date: new Date('2021-09-05'),
    },
};

export const getEvents = (regionId: RegionId, {
    organizerIds,
    trackIds,
}: { organizerIds?: OrganizerId[], trackIds?: TrackId[]}): EventModel[] => {
    return [mockEvents['1']];
};

export const getEvent = (eventId: EventId): EventModel => mockEvents[`${eventId}`];

export const getTracks = (regionId: RegionId): TrackModel[] => {
    const trackIds = mockTrackRegionJoins.filter((join) => join.regionId === regionId).map(({ trackId }) => trackId);
    return trackIds.map(trackId => mockTracks[trackId]);
};

export const getTrack = (trackId: TrackId): TrackModel => mockTracks[trackId];

export const getOrganizers = (regionId: RegionId): OrganizerModel[] => {
    const organizerIds = mockOrganizerRegionJoins.filter((join) => join.regionId === regionId).map(({ organizerId }) => organizerId);
    return organizerIds.map(organizerId => mockOrganizers[organizerId]);
};

export const getOrganizer = (organizerId: OrganizerId): OrganizerModel => mockOrganizers[organizerId];

export const getRegions = (): RegionModel[] => {
    return Object.keys(mockRegions).map(regionId => mockRegions[regionId]);
};

export const getRegion = (regionId: RegionId): RegionModel => mockRegions[regionId];