import { createServer } from "http";
import { createApp } from "./app";
import { pubSub } from "./pubSub";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";

import { buildSchema } from "type-graphql";
import { config } from "./config";

(async () => {
    const app = await createApp();

    const server = createServer(app);
    // const schema = await buildSchema({
    //     resolvers: [IncomingEventResolver],
    //     pubSub,
    // });
    server.listen(config.app.port, () => {
        // new SubscriptionServer(
        //     {
        //         execute,
        //         subscribe,
        //         schema,
        //     },
        //     {
        //         server: server,
        //         path: "/graphql",
        //     },
        // );
        console.log(`server ready: http://localhost:${config.app.port}`);
    });
})();
