// @flow
import React, { useContext, useState, type ComponentType, type Node } from 'react';
import Script from 'next/script';

import type {
  GoogleAuth,
  GoogleAuthContextValue,
  IdToken,
} from './google-auth-context';
import { GoogleAuthContext } from './google-auth-context';
import StateContext from '../js/StateContext';

const SCOPE = 'profile';

type Props = {
    children: Node,
};

type AuthState = {
    gapi: any,
    googleAuth: GoogleAuth,
}

const GoogleAuthController: ComponentType<Props> = ({ children }) => {
    const stateContext = useContext(StateContext);
    const [authState, setAuthState] = useState<?AuthState>(null);
    const [contextValue, setContextValue] = useState<GoogleAuthContextValue>(null);

    return (
        <GoogleAuthContext.Provider value={contextValue}>
            <Script src="https://apis.google.com/js/api.js" onLoad={() => {
                const { gapi } = window;
                gapi.load('client', () => {
                    gapi.client.init({
                        'apiKey': 'AIzaSyDEKkyB6-j6Oow96eb8EFJiIEbkFrx4bC0',
                        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/translate/v2/rest'],
                        'clientId': '301960945914-cees61pu2lrafj8nm7e5lbgn1v23oum0.apps.googleusercontent.com',
                        'scope': SCOPE,
                    }).then(function() {
                        const googleAuth: GoogleAuth = gapi.auth2.getAuthInstance();
                        setAuthState({
                            gapi,
                            googleAuth,
                        });
                        const setSignInStatus = () => {
                            const currentUser = googleAuth.currentUser.get();
                            const isAuthorized = currentUser.hasGrantedScopes(SCOPE)
                            if (!isAuthorized) {
                                stateContext.setState(state => ({
                                    ...state,
                                    user: null,
                                }));
                                return;
                            }
                            const { id_token } = currentUser.getAuthResponse();
                            const email = currentUser.getBasicProfile().getEmail();
                            stateContext.setState(state => ({
                                ...state,
                                user: {
                                    email,
                                },
                            }));
                        };
                        googleAuth.isSignedIn.listen((isSignedIn) => {
                            console.log('isSignedIn event:', isSignedIn)
                            setSignInStatus();
                        });
                        setContextValue({
                            onSignIn: () => googleAuth.signIn(),
                            onSignOut: () => googleAuth.signOut(),
                        });
                        setSignInStatus();
                    }).catch(function(error) {
                        console.log('Google API load error', error);
                    });
                });
            }} />
            {children}
        </GoogleAuthContext.Provider>
    )
};

export default GoogleAuthController;
