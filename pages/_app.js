// @flow
import React, { useState, type ComponentType, type AbstractComponent } from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';

import client from '../apollo-client';
import StateController from "../components/StateController/StateController";
import GoogleAuthController from "../google-auth/GoogleAuthController";

type PageProps = {};

type Props = {
    Component: AbstractComponent<PageProps>,
    PageProps: PageProps,
};

const App: ComponentType<Props> = ({ Component, PageProps }: Props) => {
    const [gapi, setGapi] = useState(null);
    console.log(gapi);
    return (
        <StateController>
            <GoogleAuthController>
                <ApolloProvider client={client}>
                    <Component {...PageProps} />
                </ApolloProvider>
            </GoogleAuthController>
        </StateController>
    );
};

export default App;
