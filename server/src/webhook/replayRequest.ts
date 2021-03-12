import http from 'http';
import https from 'https';
import url from 'url';
import express from 'express';
import { Application, ApplicationAttributes } from '../models';
import { omit } from 'lodash';
import qs from 'qs';

interface ReplayRequestParams {
    application: ApplicationAttributes;
    request: express.Request;
}

export interface ReplayRequestResults {
    data: string | null;
    error: Error | null;
    status: number;
    headers: object;
}

export const replayRequest = ({
    application,
    request: { path, method, headers, body },
}: ReplayRequestParams): Promise<ReplayRequestResults | null> =>
    new Promise((resolve) => {
        if (!application.targetUrl) {
            return resolve(null);
        }
        const { hostname, protocol, port } = url.parse(application.targetUrl);
        if (!hostname) {
            return resolve({
                data: null,
                headers: {},
                error: new Error(`${hostname} is not a valid host`),
                status: 500,
            });
        }

        const options: http.RequestOptions = {
            host: hostname,
            port,
            path,
            method,
            timeout: 60000,
            headers: {
                ...omit(headers, ['host', 'if-none-match']),
            },
        };

        let data = '';
        let responseStatus: number | undefined;
        let responseHeaders: object = {};

        const callback = (res: http.IncomingMessage) => {
            responseStatus = res.statusCode;
            responseHeaders = res.headers;
            res.on('data', (chunck: string) => {
                data += chunck;
            });
        };
        const req =
            protocol === 'http:'
                ? http.request(options, callback)
                : https.request(options, callback);
        req.on('error', (error) => {
            resolve({
                error,
                status: responseStatus || 500,
                headers: responseHeaders,
                data: null,
            });
        });
        req.on('close', () => {
            try {
                data = JSON.parse(data);
            } catch (e) {}
            resolve({
                data,
                status: responseStatus || 0,
                headers: responseHeaders,
                error: null,
            });
        });
        if (headers['content-type'] === 'x-www-form-urlencoded') {
            req.write(qs.stringify(body));
        } else if (typeof body !== 'string') {
            req.write(JSON.stringify(body));
        } else {
            req.write(body);
        }
        req.end();
    });
