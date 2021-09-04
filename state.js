// @flow
import { useContext, createContext } from 'react';

type UserId = string;
type User = {
    id: UserId,
};

type TrackHubState = {
    user: ?User,
};

const initialTrackHubState = {
    user: null,
};

const TrackHubStateContext = createContext(initialTrackHubState);

export const useTrackHubState = (): TrackHubState => useContext(TrackHubStateContext);
