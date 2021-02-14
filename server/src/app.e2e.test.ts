import * as http from "http";
import { createApp } from "./app";
import { testApp } from "./testApp/testApp";
import { Application, HookEvent, TargetResponse } from "./models";
import faker from "faker";
import express from "express";
import axios from "axios";

describe("App", () => {
    const appPort = faker.random.number({ min: 4000, max: 5000 });
    const testAppPort = faker.random.number({ min: 5001, max: 6000 });
    const appUrl = `http://localhost:${appPort}`;
    const testAppUrl = `http://localhost:${testAppPort}`;
    let app: express.Express;
    let testServer: http.Server;
    let appServer: http.Server;
    beforeAll(async () => {
        app = await createApp();
        await new Promise((resolve) => {
            appServer = app.listen(appPort, () => resolve(null));
        });
        await new Promise((resolve) => {
            testServer = testApp.listen(testAppPort, () => resolve(null));
        });
    });
    afterAll(async () => {
        await new Promise((resolve) => {
            testServer.close(resolve);
        });
        await new Promise((resolve) => {
            appServer.close(resolve);
        });
    });
    test("proxy request", async () => {
        const application = await Application.create({
            name: faker.hacker.noun(),
            targetUrl: testAppUrl,
        });
        const requestId = faker.random.uuid();
        const response = await axios.post(
            `${appUrl}/webhook/${application.id}`,
            {
                status: 201,
                requestId,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "some-customer-header": "test",
                },
            },
        );
        expect(response.status).toEqual(201);
        const [hookEvent] = await HookEvent.findAll({
            where: { body: { requestId } },
            limit: 1,
        });
        const [targetResponse] = await TargetResponse.findAll({
            where: { hookEventId: hookEvent.id },
            limit: 1,
        });
        expect(hookEvent.body).toEqual({
            status: 201,
            requestId,
        });
        expect(hookEvent.headers).toMatchObject({
            "content-type": "application/json",
            "some-customer-header": "test",
        });
        expect(targetResponse.status).toEqual(201);
        expect(targetResponse.data).toMatchObject({
            body: {
                status: 201,
                requestId,
            },
        });
    });
});
