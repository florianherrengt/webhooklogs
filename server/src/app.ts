import * as express from "express";
import * as passport from "passport";
import * as bodyParser from "body-parser";
import { proxyRequest } from "./proxyRequest";
import { sdk } from "./helpers";
import "./passport";
import { passportRouter } from "./passport/router";

const app = express();

app.use("/auth", passportRouter);

app.use("/webhook/:appId", bodyParser.json(), async (request, response) => {
    const {
        method,
        headers,
        params: { appId },
    } = request;
    const { applications_by_pk } = await sdk.getApplicationById({ id: appId });
    if (!applications_by_pk) {
        return response
            .status(404)
            .json({ error: `no application with id: ${appId} found.` });
    }
    await sdk.insertEvent({
        object: {
            method,
            payload: JSON.stringify(request.body),
            headers: JSON.stringify(headers),
            application_id: applications_by_pk.id,
        },
    });
    if (!applications_by_pk.targets.length) {
        return response.sendStatus(200);
    }
    const proxiedResponses = await Promise.all(
        applications_by_pk.targets.map((target) =>
            proxyRequest({
                request,
                target,
                method,
            }),
        ),
    );
    await sdk.insertTargetResponses({
        objects: proxiedResponses.map((r) => ({
            response: r.data,
            response_time: r.responseTime,
            targets_id: r.target.id,
            status: r.status,
        })),
    });
    response.status(proxiedResponses[0].status).json(proxiedResponses[0].data);
});

app.get("/healthz", (_, response) => {
    response.json({ ok: 1 });
});
export { app };
