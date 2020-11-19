import * as express from "express";
import fetch from "node-fetch";

interface ProxyRequestParams {
    request: express.Request;
    targetUrl: string;
    method: string;
}

export const proxyRequest = async ({
    request,
    targetUrl,
    method,
}: ProxyRequestParams) => {
    const response = await fetch(targetUrl, {
        headers: request.headers as { [key: string]: string },
        method,
        body: JSON.stringify(request.body),
    });
    const data = await response.json();
    return { status: response.status, data };
};
