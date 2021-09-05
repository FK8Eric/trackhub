// @flow
import { google } from 'googleapis';

import { createOauth2Client } from '../../js/backend/oauth/google';
import type { RequestHandler } from '../../js/backend/types';

const handler: RequestHandler = async (req, res) => {
    if (req.query.code) {
        const oauth2Client = createOauth2Client();
        const { tokens } = await oauth2Client.getToken(req.query.code);
        console.log(tokens);
        oauth2Client.setCredentials(tokens);
        let oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        });
        let { data } = await oauth2.userinfo.get();
        console.log(data);
    }
    res.redirect('/oauth/google');
};

export default handler;
