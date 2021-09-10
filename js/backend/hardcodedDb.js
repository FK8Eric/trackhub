// @flow
import type {
    EventId,
    EventModel,
    OrganizerId,
    OrganizerModel,
    OrganizerRegionJoinModel,
    RegionId,
    RegionModel,
    TrackConfigurationModel,
    TrackId,
    TrackModel,
    TrackRegionJoinModel,
} from './models';

function addIds<T>(arr: T[]): Array<{ id: number } & T> {
    return arr.map((obj, index) => ({ ...obj, id: index + 1 }));
}

export const mockRegions: RegionModel[] = addIds([
    {
        humanReadableId: 'socal',
        name: 'SoCal',
    },
    {
        humanReadableId: 'norcal',
        name: 'NorCal',
    },
]);

export const mockTracks: TrackModel[] = addIds([
    {
        humanReadableId: 'buttonwillow',
        name: 'Buttonwillow Raceway Park',
        location: 'Buttonwillow, CA',
    },
    {
        humanReadableId: 'streetsofwillow',
        name: 'Streets of Willow',
        location: 'Rosamond, CA',
    },
    {
        humanReadableId: 'bigwillow',
        name: 'Big Willow',
        location: 'Rosamond, CA',
    },
    {
        humanReadableId: 'chuckwalla',
        name: 'Chuckwalla Valley Raceway',
        location: 'Desert Center, CA',
    },
    {
        humanReadableId: 'autoclubspeedway',
        name: 'Auto Club Speedway',
        location: 'Fontana, CA',
    },
    {
        humanReadableId: 'thunderhill',
        name: 'Thunderhill',
        location: 'Willows, CA',
    },
]);

export const mockTrackConfigurations: TrackConfigurationModel[] = addIds([
    {
        trackId: 1, // buttonwillow
        humanReadableId: 'cw13',
        name: 'CW13',
    },
    {
        trackId: 6, // thunderhill
        humanReadableId: 'east',
        name: 'East',
    },
    {
        trackId: 6, // thunderhill
        humanReadableId: 'west',
        name: 'West',
    },
    {
        trackId: 6, // thunderhill
        humanReadableId: 'eastreverse',
        name: 'East Reverse',
    },
]);

export const mockTrackRegionJoins: TrackRegionJoinModel[] = [
    { trackId: 1, regionId: 1 }, // buttonwillow, socal
    { trackId: 2, regionId: 1 }, // streetsofwillow, socal
    { trackId: 3, regionId: 1 }, // bigwillow, socal
    { trackId: 4, regionId: 1 }, // chuckwalla, socal
    { trackId: 5, regionId: 1 }, // autoclubspeedway, socal
    { trackId: 1, regionId: 2 }, // buttonwillow, norcal
    { trackId: 6, regionId: 2 }, // thunderhill, norcal
];

export const mockOrganizers: OrganizerModel[] = addIds([
    {
        humanReadableId: 'speedventures',
        name: 'Speed Ventures',
        url: 'https://www.speedventures.com/',
    },
    {
        humanReadableId: 'extremespeedtrackevents',
        name: 'Extreme Speed Track Events',
        url: 'https://www.extremespeedtrackevents.com/',
    },
    {
        humanReadableId: 'turn8',
        name: 'Turn 8 Racing',
        url: 'https://www.turn8racing.com/',
    },
    {
        humanReadableId: 'ongrid',
        name: 'OnGrid Track',
        url: 'https://www.ongridtrack.com/',
    },
    {
        humanReadableId: 'speedsf',
        name: 'SpeedSF',
        url: 'https://www.speedsf.com/',
    },
    {
        humanReadableId: 'hookedondriving',
        name: 'Hooked on Driving',
        url: 'https://www.hookedondriving.com/',
    },
    {
        humanReadableId: 'socaldriversclub',
        name: 'SoCal Drivers Club',
        url: 'https://www.socaldriversclub.com/',
    },
    {
        humanReadableId: 'ncrc',
        name: 'NCRC',
        url: 'https://americanracingclub.com/',
    },
    {
        humanReadableId: 'speeddistrict',
        name: 'Speed District',
        url: 'https://speeddistrict.com/',
    },
]);

export const mockOrganizerRegionJoins: OrganizerRegionJoinModel[] = [
    { organizerId: 1, regionId: 1 }, // speedventures, socal
    { organizerId: 2, regionId: 1 }, // extremespeedtrackevents, socal
    { organizerId: 3, regionId: 1 }, // turn8, socal
    { organizerId: 4, regionId: 1 }, // ongrid, socal
    { organizerId: 5, regionId: 2 }, // speedsf, norcal
    { organizerId: 7, regionId: 1 }, // socaldriversclub, socal
    { organizerId: 8, regionId: 2 }, // ncrc, norcal
    { organizerId: 9, regionId: 1 }, // speeddistrict, socal
];

type HumanReadableEvent = {
    id: number,
    track: string,
    configuration?: string,
    organizer: string,
    date: Date,
    url: string,
};

const mockHumanReadableEvents: HumanReadableEvent[] = addIds([
    {
        track: 'bigwillow',
        organizer: 'speedventures',
        date: new Date('2021-09-11'),
        url: 'https://www.speedventures.com/Events/Detail.aspx?id=837',
    },
    {
        track: 'thunderhill',
        configuration: 'west',
        organizer: 'ongrid',
        date: new Date('2021-09-12'),
        url: 'https://www.ongridtrack.com/event-registration/west091221',
    },
    {
        track: 'buttonwillow',
        configuration: 'cw13',
        organizer: 'socaldriversclub',
        date: new Date('2021-09-17'),
        url: 'https://www.motorsportreg.com/events/sdc-buttonwillowcw13-40-cars-8-hours-of-track-buttonwillow-raceway-socal-453759',
    },
    {
        track: 'buttonwillow',
        configuration: 'cw13',
        organizer: 'speedventures',
        date: new Date('2021-09-18'),
        url: 'https://www.speedventures.com/Events/Detail.aspx?id=844',
    },
    {
        track: 'buttonwillow',
        configuration: 'cw13',
        organizer: 'speedventures',
        date: new Date('2021-09-19'),
        url: 'https://www.speedventures.com/Events/Detail.aspx?id=844',
    },
    {
        track: 'bigwillow',
        organizer: 'extremespeedtrackevents',
        date: new Date('2021-09-25'),
        url: 'https://www.extremespeedtrackevents.com/component/dtregister/03272021-497/register?Itemid=189',
    },
    {
        track: 'bigwillow',
        organizer: 'extremespeedtrackevents',
        date: new Date('2021-09-26'),
        url: 'https://www.extremespeedtrackevents.com/component/dtregister/03272021-498/register?Itemid=189',
    },
    {
        track: 'thunderhill',
        configuration: 'eastreverse',
        organizer: 'ncrc',
        date: new Date('2021-09-27'),
        url: 'https://americanracingclub.com/registration/',
    },
    {
        track: 'buttonwillow',
        configuration: 'cw13',
        organizer: 'turn8',
        date: new Date('2021-10-01'),
        url: 'https://www.turn8racing.com/event-details/10-1-2021-buttonwillow-13-cw-time-attack-round-6',
    },
    {
        track: 'buttonwillow',
        configuration: 'cw13',
        organizer: 'ncrc',
        date: new Date('2021-10-02'),
        url: 'https://americanracingclub.com/registration/',
    },
    {
        track: 'autoclubspeedway',
        organizer: 'speedventures',
        date: new Date('2021-10-02'),
        url: 'https://www.speedventures.com/events/Detail.aspx?id=860',
    },
    {
        track: 'buttonwillow',
        configuration: 'cw13',
        organizer: 'ncrc',
        date: new Date('2021-10-03'),
        url: 'https://americanracingclub.com/registration/',
    },
    {
        track: 'autoclubspeedway',
        organizer: 'speedventures',
        date: new Date('2021-10-03'),
        url: 'https://www.speedventures.com/events/Detail.aspx?id=860',
    },
    {
        track: 'buttonwillow',
        configuration: 'cw13',
        organizer: 'speedventures',
        date: new Date('2021-10-08'),
        url: 'https://www.speedventures.com/events/Detail.aspx?id=854',
    },
    {
        track: 'buttonwillow',
        configuration: 'cw13',
        organizer: 'speedventures',
        date: new Date('2021-10-09'),
        url: 'https://www.speedventures.com/events/Detail.aspx?id=842',
    },
    {
        track: 'buttonwillow',
        configuration: 'cw13',
        organizer: 'speedventures',
        date: new Date('2021-10-10'),
        url: 'https://www.speedventures.com/events/Detail.aspx?id=842',
    },
    {
        track: 'bigwillow',
        organizer: 'speeddistrict',
        date: new Date('2021-10-15'),
        url: 'https://speeddistrict.com/events/october-15-willow-springs-raceway-road-course/',
    },
]);

const mapHumanReadableEvents = (humanReadableEvents) => {
    return humanReadableEvents.map(humanReadableEvent => {
        // $FlowFixMe
        const trackId = mockTracks.find(track => track.humanReadableId === humanReadableEvent.track).id;
        // $FlowFixMe
        const organizerId = mockOrganizers.find(organizer => organizer.humanReadableId === humanReadableEvent.organizer).id;
        const trackConfigurationId = humanReadableEvent.configuration ? mockTrackConfigurations.find(trackConfiguration => trackConfiguration.humanReadableId === humanReadableEvent.configuration)?.id : null;
        return {
            id: humanReadableEvent.id,
            trackId,
            configurationId: trackConfigurationId,
            organizerId,
            date: humanReadableEvent.date,
            url: humanReadableEvent.url,
        };
    });
};

export const mockEvents: EventModel[] = mapHumanReadableEvents(mockHumanReadableEvents);
