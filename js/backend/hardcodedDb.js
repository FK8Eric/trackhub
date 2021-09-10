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

export const mockRegions: RegionModel[] = [
    {
        id: 1,
        humanReadableId: 'socal',
        name: 'SoCal',
    },
    {
        id: 2,
        humanReadableId: 'norcal',
        name: 'NorCal',
    },
];

export const mockTracks: TrackModel[] = [
    {
        id: 1,
        humanReadableId: 'buttonwillow',
        name: 'Buttonwillow Raceway Park',
        location: 'Buttonwillow, CA',
    },
    {
        id: 2,
        humanReadableId: 'streetsofwillow',
        name: 'Streets of Willow',
        location: 'Rosamond, CA',
    },
    {
        id: 3,
        humanReadableId: 'bigwillow',
        name: 'Big Willow',
        location: 'Rosamond, CA',
    },
    {
        id: 4,
        humanReadableId: 'chuckwalla',
        name: 'Chuckwalla Valley Raceway',
        location: 'Desert Center, CA',
    },
    {
        id: 5,
        humanReadableId: 'autoclubspeedway',
        name: 'Auto Club Speedway',
        location: 'Fontana, CA',
    },
    {
        id: 6,
        humanReadableId: 'thunderhill',
        name: 'Thunderhill',
        location: 'Willows, CA',
    },
];

export const mockTrackRegionJoins: TrackRegionJoinModel[] = [
    { trackId: 1, regionId: 1 }, // buttonwillow, socal
    { trackId: 2, regionId: 1 }, // streetsofwillow, socal
    { trackId: 3, regionId: 1 }, // bigwillow, socal
    { trackId: 4, regionId: 1 }, // chuckwalla, socal
    { trackId: 5, regionId: 1 }, // autoclubspeedway, socal
    { trackId: 1, regionId: 2 }, // buttonwillow, norcal
    { trackId: 6, regionId: 2 }, // thunderhill, norcal
];

export const mockOrganizers: OrganizerModel[] = [
    {
        id: 1,
        humanReadableId: 'speedventures',
        name: 'Speed Ventures',
        url: 'https://www.speedventures.com/',
    },
    {
        id: 2,
        humanReadableId: 'extremespeedtrackevents',
        name: 'Extreme Speed Track Events',
        url: 'https://www.extremespeedtrackevents.com/',
    },
    {
        id: 3,
        humanReadableId: 'turn8',
        name: 'Turn 8 Racing',
        url: 'https://www.turn8racing.com/',
    },
    {
        id: 4,
        humanReadableId: 'ongrid',
        name: 'OnGrid Track',
        url: 'https://www.ongridtrack.com/',
    },
    {
        id: 5,
        humanReadableId: 'speedsf',
        name: 'SpeedSF',
        url: 'https://www.speedsf.com/',
    },
    {
        id: 6,
        humanReadableId: 'hookedondriving',
        name: 'Hooked on Driving',
        url: 'https://www.hookedondriving.com/',
    },
    {
        id: 7,
        humanReadableId: 'socaldriversclub',
        name: 'SoCal Drivers Club',
        url: 'https://www.socaldriversclub.com/',
    },
    {
        id: 8,
        humanReadableId: 'ncrc',
        name: 'NCRC',
        url: 'https://americanracingclub.com/',
    },
];

export const mockOrganizerRegionJoins: OrganizerRegionJoinModel[] = [
    { organizerId: 1, regionId: 1 }, // speedventures, socal
    { organizerId: 2, regionId: 1 }, // extremespeedtrackevents, socal
    { organizerId: 3, regionId: 1 }, // turn8, socal
    { organizerId: 4, regionId: 1 }, // ongrid, socal
    { organizerId: 5, regionId: 2 }, // speedsf, norcal
];
