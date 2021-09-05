// @flow
import React, { useState, createContext, useContext, type Context, type ComponentType, type AbstractComponent } from 'react';

export type IdToken = any;

type GoogleUser = {
    getAuthResponse: () => {
        id_token: IdToken,
    },
    getBasicProfile: () => {
        getEmail: () => string,
    },
    hasGrantedScopes: (string) => boolean,
};

export type GoogleAuth = {
    isSignedIn: {
        listen: ((isSignedIn: boolean) => void) => void,
    },
    currentUser: {
        get: () => GoogleUser,
    },
    signIn: () => void,
    signOut: () => void,

};

export type GoogleAuthContextValue = ?{
    onSignIn: () => void,
    onSignOut: () => void,
};

export const GoogleAuthContext: Context<GoogleAuthContextValue> =
    createContext(null);
