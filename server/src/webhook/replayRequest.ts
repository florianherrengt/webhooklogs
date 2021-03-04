import http from 'http';
import https from 'https';
import url from 'url';
import express from 'express';
import { Application } from '../models';
import { omit } from 'lodash';

interface ReplayRequestParams {
    application: Application;
    request: express.Request;
}

export const replayRequest = ({
    application,
    request: { path, method, headers },
}: ReplayRequestParams): Promise<{
    data: string | null;
    error: Error | null;
    status: number;
    headers: object;
} | null> =>
    new Promise((resolve) => {
        if (!application.targetUrl) {
            return resolve(null);
        }
        const { host, protocol } = url.parse(application.targetUrl);
        if (!host) {
            return resolve({
                data: null,
                headers: {},
                error: new Error(`${host} is not a valid host`),
                status: 500,
            });
        }

        const options: http.RequestOptions = {
            host,
            path,
            method,
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
                console.log(data);
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
            resolve({
                data,
                status: responseStatus || 0,
                headers: responseHeaders,
                error: null,
            });
        });
        req.end();
    });
