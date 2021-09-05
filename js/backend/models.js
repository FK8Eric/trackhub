// @flow

export type TrackId = string

export type OrganizerId = string

export type OrganizerModel = {
    id: OrganizerId,
    name: string,
    url: ?string
}

export type TrackModel = {
    id: TrackId,
    name: string,
    location: string
}

export type EventId = number

export type EventModel = {
    id: EventId,
    trackId: TrackId,
    organizerId: OrganizerId,
    date: Date,
}

export type RegionId = string

export type RegionModel = {
    id: RegionId,
    name: string,
}

export type OrganizerRegionJoinModel = {
    organizerId: OrganizerId,
    regionId: RegionId,
}

export type TrackRegionJoinModel = {
    trackId: TrackId,
    regionId: RegionId,
}
