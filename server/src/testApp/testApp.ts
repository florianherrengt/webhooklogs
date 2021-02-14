import express from "express";
import * as bodyParser from "body-parser";

const testApp = express();

testApp.use(bodyParser.json(), (request, response) => {
    const info = {
        status: request.body.status || 200,
        headers: request.headers,
        url: request.originalUrl,
        body: request.body,
    };
    response.status(info.status).json({ ok: 1, ...info });
});

export { testApp };
