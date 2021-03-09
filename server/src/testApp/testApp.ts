import express from 'express';
import * as bodyParser from 'body-parser';

const testApp = express();

testApp.use(bodyParser.json(), bodyParser.urlencoded(), (request, response) => {
    const info = {
        date: new Date(),
        method: request.method,
        status: request.body.status || 200,
        headers: request.headers,
        url: request.originalUrl,
        body: request.body,
    };
    console.info('request...', new Date(), info);
    response.status(info.status).json({ ok: 1, ...info });
});

export { testApp };
