// @flow
import { type ComponentType, useEffect } from 'react';

type Props = {};

const Google: ComponentType<Props> = () => {
    useEffect(() => {
        window.close();
    }, []);
    return null;
};

export default Google;
