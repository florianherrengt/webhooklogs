import "reflect-metadata";
import "./passport";
import express from "express";
import * as bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { passportRouter } from "./passport/router";
import { pubSub } from "./pubSub";
import { HealthzResolver } from "./resolvers/healthz";
import { Application, HookEvent, sequelize, TargetResponse } from "./models";
import axios from "axios";

type SupportedMethod = "GET" | "POST" | "PUT" | "DELETE";

const isSupportedMethod = (method: string): method is SupportedMethod =>
    ["GET", "POST", "PUT", "DELETE"].includes(method);

const createApp = async (): Promise<express.Express> => {
    const app = express();
    await sequelize.sync();
    const schema = await buildSchema({
        resolvers: [HealthzResolver],
        pubSub,
    });
    const server = new ApolloServer({
        schema,
    });

    server.applyMiddleware({ app });

    app.use("/auth", passportRouter);

    app.use("/webhook/:appId", bodyParser.json(), async (request, response) => {
        const {
            // method,
            headers,
            body,
            params: { appId },
        } = request;
        if (!isSupportedMethod(request.method)) {
            return response
                .status(501)
                .json({ error: `${request.method} not supported yet` });
        }

        const application = await Application.findByPk(appId);
        if (!application) {
            return response
                .status(404)
                .json({ error: `no application with id: ${appId} found.` });
        }

        const hookEvent = await HookEvent.create({
            ...request,
            headers: request.headers,
            applicationId: appId,
        });

        const result = await {
            GET: () => axios.get(application.targetUrl, { headers }),
            POST: () => axios.post(application.targetUrl, body, { headers }),
            PUT: () => axios.put(application.targetUrl, body, { headers }),
            DELETE: () => axios.delete(application.targetUrl, { headers }),
        }[request.method]();

        await TargetResponse.create({
            ...result,
            hookEventId: hookEvent.id,
        });
        response.status(result.status).send(result.data);
    });

    app.get("/healthz", (_, response) => {
        response.json({ ok: 1 });
    });
    return app;
};
export { createApp };
