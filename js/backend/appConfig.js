// TODO(flow)

const appConfig = {
    // https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '301960945914-cees61pu2lrafj8nm7e5lbgn1v23oum0.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || '',
};

export default appConfig;
