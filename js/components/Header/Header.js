// @flow
import React, { type ComponentType } from 'react';
import Link from 'next/link';

import { desktopWidth } from '../../styling';
import GoogleAuth from '../GoogleAuth/GoogleAuth';

const navbarItemPadding = '0.625em';

type Props = {};

const Header: ComponentType<Props> = () => {
    return (
        <>
            <nav className="navbar">
                <ul className="list-reset navbar-items">
                    <li className="navbar-item">
                        <Link href="/">
                            <img alt="trackhub-logo" className="trackhub-logo" src="https://cdn.discordapp.com/attachments/808593435933016065/883877324112670810/Jaseowns_PH_Logo.jpg" />
                        </Link>
                        {' '} - SoCal
                    </li>
                    <li className="navbar-item">
                        <Link href="/tracks">
                            Tracks
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link href="/beginners-guide">
                            Beginner&apos;s Guide
                        </Link>
                    </li>
                    <li className="navbar-item navbar-expander">
                        <button>Menu</button>
                    </li>
                </ul>
            </nav>
            <p>The platform for track enthusiasts.</p>
            <GoogleAuth />

            <style jsx>{`
                .trackhub-logo {
                    width: 9em;
                }

                .navbar-items {
                    display: flex;
                    margin-left: -${navbarItemPadding};
                    margin-right: -${navbarItemPadding};
                }

                .navbar-item {
                    padding: ${navbarItemPadding};
                }

                .navbar-item:first-child {
                    flex: 1;
                }

                .navbar-item:not(:first-child) {
                    display: none;
                }
                @media only screen and (min-width: ${desktopWidth}) {
                    .navbar-item:not(:first-child) {
                        display: initial;
                    }
                }

                .is-open .navbar-item:not(:first-child) {
                    display: initial;
                }

                .navbar-item.navbar-expander {
                    display: initial;
                }
                @media only screen and (min-width: ${desktopWidth}) {
                    .navbar-item.navbar-expander {
                        display: none;
                    }
                }
            `}</style>
        </>
    );
};

export default Header;
