// @flow
import { google, type OAuth2Client } from 'googleapis';

import appConfig from '../appConfig';

export const createOauth2Client = (): OAuth2Client => new google.auth.OAuth2(
    appConfig.GOOGLE_CLIENT_ID,
    appConfig.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000/api/oauth-redirect-google',
);

const oauth2Client = createOauth2Client();
const scopes = ['profile'];
export const authUrl: string = oauth2Client.generateAuthUrl({
    access_type: 'online',
    scope: scopes,
});

export const authenticate = async (idToken: string): any => {
    let oauth2 = google.oauth2({
        auth: 'AIzaSyDt5EQwRfAzZQAezNCpqK5t_kY-bYhS0WQ',
        version: 'v2'
    });
    const { data } = await oauth2.tokeninfo({ id_token: idToken });
    if (data.audience !== appConfig.GOOGLE_CLIENT_ID) {
        const errorMessage = 'User tried to authenticate with different client ID';
        console.log(errorMessage);
        throw new Error(errorMessage);
    }
    return data;
};

