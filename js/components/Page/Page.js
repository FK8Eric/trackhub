// @flow
import React, { type ComponentType, type Node } from 'react';
import Head from 'next/head';

import Header from '../Header';
import { desktopWidth } from '../../styling';

type Props = {
    children: Node,
    title: string,
};

const Page: ComponentType<Props> = ({ children, title }) => {
    return (
        <div className="container">
            <Head>
                <title>{title} | TrackHub</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Header />
                {children}
            </main>

            <style jsx global>{`
                html, body {
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                        Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                        sans-serif;
                }

                * {
                    box-sizing: border-box;
                }

                main {
                    padding-left: 1em;
                    padding-right: 1em;
                    max-width: 60rem;
                    margin: auto;
                }
                @media only screen and (min-width: ${desktopWidth}) {
                    main {
                        padding-left: 2em;
                        padding-right: 2em;
                    }
                }

                a {
                    text-decoration: none;
                }

                .list-reset {
                    list-style: none;
                    padding-inline-start: 0;
                }
            `}</style>
        </div>
    );
};

export default Page;
