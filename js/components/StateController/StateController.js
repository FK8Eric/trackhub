// @flow
import React, { useState, type ComponentType, type Node } from 'react';

import StateContext, { initialState } from "../../StateContext";

type Props = {
    children: Node,
};

const StateController: ComponentType<Props> = ({ children }: Props) => {
    const [state, setState] = useState(initialState());
    return (
        <StateContext.Provider value={{
            state,
            setState,
        }}>
            {children}
        </StateContext.Provider>
    )
};

export default StateController;
