import * as express from "express";
import fetch from "node-fetch";
import * as bodyParser from "body-parser";
import { proxyRequest } from "./proxyRequest";
const app = express();

app.use(
    "/webhook/:clientId/:appId",
    bodyParser.json(),
    async (request, response) => {
        const { clientId, appId } = request.params;
        const { status, data } = await proxyRequest({
            request,
            targetUrl: "http://localhost:3001/test",
            method: request.method,
        });
        await proxyRequest({
            request,
            targetUrl: "http://localhost:3001/test2",
            method: request.method,
        });
        response.status(status).json(data);
    },
);

app.get("/healthz", (_, response) => {
    response.json({ ok: 1 });
});
export { app };
