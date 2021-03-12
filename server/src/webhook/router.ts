import bodyParser from 'body-parser';
import { Router } from 'express';
import { cache } from '../cache';
import { Application, HookEvent, TargetResponse } from '../models';
import { processHookEvent } from './processHookEvent';
import { replayRequest } from './replayRequest';
import * as uuid from 'uuid';

export const webhookRouter = Router();

webhookRouter.use(
    '/webhook/:applicationId',
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    async (request, response) => {
        const {
            params: { applicationId },
        } = request;

        if (!uuid.validate(request.params.applicationId)) {
            return response
                .status(400)
                .json({ error: 'invalid application id' });
        }
        const { hookEvent, replayResponse } = await processHookEvent({
            request,
            applicationId,
        });

        Object.entries(replayResponse?.headers || []).forEach(
            ([key, value]) => {
                response.setHeader(key, value);
            },
        );
        response.status(replayResponse?.status || 200).send(
            replayResponse?.data || {
                hookEvent,
                message: 'no data return by the target',
                replayResponse,
            },
        );
    },
);
