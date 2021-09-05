// @flow
import React, { useState, type ComponentType, type AbstractComponent } from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';

import GoogleAuthController from '../google-auth/GoogleAuthController';
import StateController from '../js/components/StateController';
import client from '../js/apollo-client';

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
