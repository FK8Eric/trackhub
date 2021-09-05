// TODO(flow)
import configJson from '../../config.json';
import secretConfigJson from '../../config.secret.json';

const appConfig = {
    ...configJson,
    ...secretConfigJson,
};

export default appConfig;
