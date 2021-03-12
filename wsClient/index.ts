// Start the connection to the WebSocket server at echo.websocket.org
const ws = new WebSocket("wss://webhooklogs.com/api/graphql", "graphql-ws");

// Register event listeners for the open, close, and message events
ws.onopen = () => {
    console.log("Connected... waiting for requests");

    // Send a message over the WebSocket to the server
    ws.send(
        JSON.stringify({
            type: "connection_init",
            payload: {
                authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzN2Y2NTY3ZC1kNjc4LTRmNzMtYWRkOC0yOTI0ZmIzMmY4NzAiLCJpYXQiOjE2MTUzMjMwNDIsImV4cCI6MTYxNzkxNTA0MiwiYXVkIjoid2ViIiwiaXNzIjoid2ViaG9va2xvZ3MuY29tIn0.Z18vrlwgP6IJfE5c1bZNom1eap4lNwM3enipxy8MxC8",
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
                        variables: { applicationId: "f9fb2a33-a97c-43f2-9d89-446813652dfa" },
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
