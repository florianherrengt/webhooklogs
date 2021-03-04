import { Router } from 'express';
import url from 'url';
import bodyParser from 'body-parser';
import axios from 'axios';
import { Application, HookEvent, TargetResponse } from '../models';
import { pubSub } from '../pubSub';

export const webhookRouter = Router();

type SupportedMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const isSupportedMethod = (method: string): method is SupportedMethod =>
    ['GET', 'POST', 'PUT', 'DELETE'].includes(method);

webhookRouter.use(
    '/webhook/:appId',
    bodyParser.json(),
    bodyParser.urlencoded(),
    async (request, response) => {
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
            path: request.path || '/',
            headers: request.headers,
            applicationId: appId,
        });
        await pubSub.publish(
            'NEW_HOOK_EVENT',
            JSON.stringify(hookEvent.toJSON()),
        );

        if (!application.targetUrl) {
            return response.json({ hookEvent });
        }
        const targetUrl = application.targetUrl + request.path;
        const { host } = url.parse(application.targetUrl);
        try {
            const result = await {
                GET: () =>
                    axios.get(targetUrl, {
                        headers: {
                            ...headers,
                            host,
                        },
                    }),
                POST: () =>
                    axios.post(targetUrl, body, {
                        headers: {
                            ...headers,
                            host,
                        },
                    }),
                PUT: () =>
                    axios.put(targetUrl, body, {
                        headers: {
                            ...headers,
                            host,
                        },
                    }),
                DELETE: () =>
                    axios.delete(targetUrl, {
                        headers: {
                            ...headers,
                            host,
                        },
                    }),
            }[request.method]();
            await TargetResponse.create({
                ...result,
                hookEventId: hookEvent.id,
            });
            return response.status(result.status).send(result.data);
        } catch (error) {
            await TargetResponse.create({
                status: 500,
                data: error,
                headers: {},
                hookEventId: hookEvent.id,
            });
            return response.status(500).send(error);
        }
    },
);
