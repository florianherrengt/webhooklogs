import * as http from "http";
import { app } from "./app";
import { testApp } from "./testApp/testApp";
import fetch from "node-fetch";

describe("App", () => {
    let testServer: http.Server;
    let appServer: http.Server;
    beforeEach(async () => {
        await new Promise((resolve) => {
            appServer = app.listen(3000, resolve);
        });
        await new Promise((resolve) => {
            testServer = testApp.listen(3001, resolve);
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
        const response = await fetch("http://localhost:3000/webhook/123", {
            headers: {
                "Content-Type": "application/json",
                "some-customer-header": "test",
            },
            method: "POST",
            body: JSON.stringify({ status: 201 }),
        });
        expect(response.status).toEqual(201);
        const results = await response.json();
        expect(results.headers["some-customer-header"]).toEqual("test");
    });
});
