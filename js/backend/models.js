// @flow

export type TrackId = number;

export type OrganizerId = number;

export type OrganizerModel = {
    id: OrganizerId,
    humanReadableId: string,
    name: string,
    url: ?string
};

export type TrackModel = {
    id: TrackId,
    humanReadableId: string,
    name: string,
    location: string
};

export type EventId = number;

export type EventModel = {
    id: EventId,
    trackId: TrackId,
    organizerId: OrganizerId,
    date: Date,
};

export type RegionId = number;

export type RegionModel = {
    id: RegionId,
    humanReadableId: string,
    name: string,
};

export type OrganizerRegionJoinModel = {
    organizerId: OrganizerId,
    regionId: RegionId,
};

export type TrackRegionJoinModel = {
    trackId: TrackId,
    regionId: RegionId,
};
