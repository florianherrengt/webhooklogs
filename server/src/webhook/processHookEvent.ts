import { throttle } from 'lodash';
import express from 'express';
import { cache } from '../cache';
import {
    Application,
    HookEvent,
    HookEventAttributes,
    HookEventCreationAttributes,
    TargetResponse,
} from '../models';
import { replayRequest, ReplayRequestResults } from './replayRequest';

interface AddEventParams {
    request: express.Request;
    applicationId: string;
}

export const processHookEvent = async ({
    request,
    applicationId,
}: AddEventParams): Promise<{
    hookEvent: HookEventAttributes;
    replayResponse?: ReplayRequestResults | null;
}> => {
    const application =
        (await cache.application.get(`application:${applicationId}`)) ||
        (await Application.findByPk(applicationId));
    if (!application) {
        throw new Error(`no application with id: ${applicationId} found.`);
    }
    const [hookEvent, replayResponse] = await Promise.all([
        HookEvent.create({
            ...request,
            path: request.path || '/',
            headers: request.headers,
            applicationId,
        }),
        replayRequest({
            application,
            request,
        }),
    ]);

    if (!replayResponse?.data) {
        return { hookEvent, replayResponse };
    }

    const data = replayResponse.data || replayResponse.error?.message || {};
    await TargetResponse.create({
        data,
        headers: replayResponse.headers,
        hookEventId: hookEvent.id,
        status: replayResponse.status,
    });
    return { hookEvent, replayResponse };
};
