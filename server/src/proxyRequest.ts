import * as express from "express";
import fetch from "node-fetch";
import { Targets } from "./helpers";

interface ProxyRequestParams {
    request: express.Request;
    method: string;
    target: Pick<Targets, "id" | "url">;
}

export const proxyRequest = async ({
    request,
    target,
    method,
}: ProxyRequestParams) => {
    const date = new Date();
    const response = await fetch(target.url, {
        headers: request.headers as { [key: string]: string },
        method,
        body: JSON.stringify(request.body),
    });
    const data = await response.json();
    return {
        status: response.status,
        data,
        responseTime: date.valueOf() - new Date().valueOf(),
        target,
    };
};
