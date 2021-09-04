// @flow
import React, { type ComponentType, type AbstractComponent } from 'react';
import { ApolloProvider } from '@apollo/client';

import client from '../apollo-client';

type PageProps = {};

type Props = {
    Component: AbstractComponent<PageProps>,
    PageProps: PageProps,
};

const App: ComponentType<Props> = ({ Component, PageProps }: Props) => {
    return (
        <ApolloProvider client={client}>
            <Component {...PageProps} />
        </ApolloProvider>
    );
};

export default App;
