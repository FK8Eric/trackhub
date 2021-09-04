import { useContext, createContext } from "react";

const TrackHubStateContext = createContext();

export const useTrackHubState = () => useContext(TrackHubStateContext);
