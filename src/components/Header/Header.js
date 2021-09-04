import Link from 'next/link';
import { desktopWidth } from '../../styling';

const navbarItemPadding = `0.625em`;

const Header = () => {
    return (
        <>
        <nav className="navbar">
            <ul className="list-reset navbar-items">
                <li className="navbar-item">
                    <Link href="/">
                        TrackHub
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
                        Beginner's Guide
                    </Link>
                </li>
                <li className="navbar-item navbar-expander">
                    <button>Menu</button>
                </li>
            </ul>
        </nav>
        <p>The platform for track enthusiasts.</p>

            <style jsx>{`
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
