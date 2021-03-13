import { parse } from "https://deno.land/std/flags/mod.ts";

const args = parse(Deno.args);

const applicationId = args["id"];
const apiKey = args["api-key"];
const target = args["target"];

if (!applicationId) {
    console.error("invalid --id params");
    Deno.exit(1);
}

if (!apiKey) {
    console.error("invalid --api-key params");
    Deno.exit(1);
}

if (!target) {
    console.error("invalid --target params");
    Deno.exit(1);
}

const start = async () => {
    try {
        await fetch(target, { method: "HEAD" });
    } catch (error) {
        console.error("cannot reach target", error.message);
        Deno.exit(1);
    }
    const isSecure = true;
    const baseUrl = "webhooklogs.com";
    // const baseUrl = "localhost:3001";

    const { version } = await (
        await fetch(`http${isSecure ? "s" : ""}://${baseUrl}/api/config/wsClient/version`)
    ).json();

    if (version !== 1) {
        console.error(
            "this version is outdated. Please download the latest version at https://minio.specian.co.uk/webhooklogs-ws-client/wsClient"
        );
        Deno.exit(1);
    }

    // const ws = new WebSocket("ws://localhost:3001/api/graphql", "graphql-ws");
    const ws = new WebSocket(`ws${isSecure ? "s" : ""}://${baseUrl}/api/graphql`, "graphql-ws");

    ws.onopen = () => {
        console.log("Connected... waiting for requests");

        ws.send(
            JSON.stringify({
                type: "connection_init",
                payload: {
                    "x-api-key": apiKey,
                },
            })
        );

        setInterval(() => {
            ws.send(JSON.stringify({ type: "ka" }));
        }, 30000);
    };
    ws.onmessage = async (message) => {
        // Log the message we recieve:
        // console.log("Received data:", message.data);
        try {
            const data = JSON.parse(message.data);

            if (data.type === "connection_ack") {
                ws.send(
                    JSON.stringify({
                        id: "1",
                        type: "start",
                        payload: {
                            variables: { applicationId },
                            extensions: {},
                            operationName: "newHookEvent",
                            query:
                                "subscription newHookEvent($applicationId: String!) {\n  newHookEvent(applicationId: $applicationId) {\n    ...HookEventsFragment\n    __typename\n  }\n}\n\nfragment HookEventsFragment on HookEvent {\n  id\n  method\n  headers\n  path\n  body\n  applicationId\n  createdAt\n  updatedAt\n  targetResponse {\n    id\n    data\n    headers\n    status\n    __typename\n  }\n  __typename\n}\n",
                        },
                    })
                );
            }
            if ((data.type = "data" && data.payload?.data?.newHookEvent)) {
                console.info("=================================");
                console.info("          New request");
                console.info("=================================");

                const options = {
                    method: data.payload?.data?.newHookEvent.method.toUpperCase(),
                    headers: JSON.parse(data.payload?.data?.newHookEvent.headers),
                    body: data.payload?.data?.newHookEvent.body,
                };

                Reflect.deleteProperty(options.headers, "content-length");
                console.info("Payload", options);

                const results = await fetch("http://localhost:3002" + data.payload?.data?.newHookEvent.path, options);
                console.info(results);
                console.info("=================================");
            }
        } catch (e) {
            console.error(e);
        }
    };
    ws.onclose = () => {
        console.log("Connection closed");
        Deno.exit(1);
    };
    ws.onerror = (err) => console.log("Error:", err);
};

start();
