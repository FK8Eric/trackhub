// @flow
import React, { type ComponentType, type AbstractComponent } from 'react';
import { ApolloProvider } from '@apollo/client';

import GoogleAuthController from '../js/google-auth/GoogleAuthController';
import StateController from '../js/components/StateController';
import client from '../js/apollo-client';

type PageProps = {};

type Props = {
    Component: AbstractComponent<PageProps>,
    PageProps: PageProps,
};

const App: ComponentType<Props> = ({ Component, PageProps }: Props) => {
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
