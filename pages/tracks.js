import Head from 'next/head';
import Page from '../src/components/Page/Page';
import { desktopWidth } from '../src/styling';

const Tracks = () => {
    return (
        <Page title="Tracks">
            <h1>Tracks</h1>
            <ol className="list-reset">
                <li className="track-card">
                    <div className="header">
                        <span>
                            #1:
                        </span>
                        <h2 className="track-name">
                            Buttonwillow Raceway Park
                        </h2>
                        <span>Buttonwillow, California</span>
                    </div>
                    <div>
                        <h3>
                            Quick facts
                        </h3>
                        <ul>
                            <li>
                                Most popular configuration: CW13
                            </li>
                            <li>
                                Benchmark laptime: under 2:00 ("sub 2")
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>
                            Track characteristics
                        </h3>
                        <ul>
                            <li>
                                Medium-high speed
                            </li>
                            <li>
                                Fuel-intensive
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>
                            Popular time attack events
                        </h3>
                        <ul>
                            <li>
                                Global Time Attack
                            </li>
                            <li>
                                CSF Bimmer Challenge
                            </li>
                            <li>
                                Nissan Challenge
                            </li>
                        </ul>
                    </div>
                </li>
            </ol>

            <style jsx>{`
                .track-card .track-name {
                    font-size: 2em;
                    display: inline;
                    flex: 1;
                    margin: 0;
                }

                .track-card .header {
                    display: flex;
                    flex-direction: column;
                    align-items: baseline;
                }

                @media only screen and (min-width: ${desktopWidth}) {
                    .track-card .header {
                        flex-direction: row;
                    }

                    .track-card .track-name {
                        margin-left: 0.15em;
                    }
                }
            `}</style>
        </Page>
    );
};

export default Tracks;
