import * as Websocket from "websocket";

const client = new Websocket.client();

client.connect("wss://.../v1/graphql", undefined, undefined, {
    "x-hasura-admin-secret": "...",
});
client.on("connect", (connection) => {
    connection.send(
        JSON.stringify({
            payload: {
                headers: {
                    "content-type": "application/json",
                    "x-hasura-admin-secret": "...",
                },
            },
            lazy: true,
            type: "connection_init",
        }),
    );
    connection.send(
        JSON.stringify({
            id: "1",
            payload: {
                extensions: {},
                operationName: null,
                query: `subscription {  }`,
                variables: {},
            },
            type: "start",
        }),
    );
    connection.on("message", console.log);
});
