import bodyParser from 'body-parser';
import { Router } from 'express';
import { Application, HookEvent, TargetResponse } from '../models';
import { replayRequest } from './replayRequest';

export const webhookRouter = Router();

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

        const application = await Application.findByPk(appId);
        if (!application) {
            return response
                .status(404)
                .json({ error: `no application with id: ${appId} found.` });
        }

        const [hookEvent, replayResponse] = await Promise.all([
            HookEvent.create({
                ...request,
                path: request.path || '/',
                headers: request.headers,
                applicationId: appId,
            }),
            replayRequest({
                application,
                request,
            }),
        ]);

        if (!replayResponse?.data) {
            return response.json(hookEvent);
        }

        const data = replayResponse.data || replayResponse.error?.message || {};
        await TargetResponse.create({
            data,
            headers: replayResponse.headers,
            hookEventId: hookEvent.id,
            status: replayResponse.status,
        });
        Object.entries(replayResponse.headers).forEach(([key, value]) => {
            response.setHeader(key, value);
        });
        response.status(replayResponse.status).send(data);
        // try {
        //     const result = await {
        //         GET: () =>
        //             axios.get(targetUrl, {
        //                 headers: {
        //                     ...headers,
        //                     host,
        //                 },
        //             }),
        //         POST: () =>
        //             axios.post(targetUrl, body, {
        //                 headers: {
        //                     ...headers,
        //                     host,
        //                 },
        //             }),
        //         PUT: () =>
        //             axios.put(targetUrl, body, {
        //                 headers: {
        //                     ...headers,
        //                     host,
        //                 },
        //             }),
        //         DELETE: () =>
        //             axios.delete(targetUrl, {
        //                 headers: {
        //                     ...headers,
        //                     host,
        //                 },
        //             }),
        //     }[request.method]();
        //     await TargetResponse.create({
        //         ...result,
        //         hookEventId: hookEvent.id,
        //     });
        //     return response.status(result.status).send(result.data);
        // } catch (error) {
        //     await TargetResponse.create({
        //         status: 500,
        //         data: error,
        //         headers: {},
        //         hookEventId: hookEvent.id,
        //     });
        //     return response.status(500).send(error);
        // }
    },
);
