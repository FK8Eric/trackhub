// @flow
import { createContext, type Context } from 'react';

import type { User } from '../types/user';

export type State = {
    user: ?User,
};

export const initialState = (): State => ({
    user: null,
});

export type StateContextValue = {
    state: State,
    setState: ((State) => State) => void,
};

const StateContext: Context<StateContextValue> =
    // $FlowFixMe
    createContext();

export default StateContext;
