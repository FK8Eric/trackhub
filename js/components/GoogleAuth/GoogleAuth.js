// @flow
import React, { useContext, type ComponentType } from 'react';

import StateContext from "../../StateContext";
import { GoogleAuthContext } from "../../../google-auth/google-auth-context";

type Props = {};

const GoogleAuth: ComponentType<Props> = () => {
    const { user } = useContext(StateContext).state;
    const googleAuthContext = useContext(GoogleAuthContext);
    if (!googleAuthContext) {
        return null;
    }
    if (user) {
        return <><span>Signed in as {user.email}</span><button onClick={() => googleAuthContext.onSignOut()}>Sign out</button></>;
    }
    return (
        <button onClick={() => googleAuthContext.onSignIn()}>Sign into Google</button>
    );
};

export default GoogleAuth;
