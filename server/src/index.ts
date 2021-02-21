import { createServer } from 'http';
import { createApp } from './app';
import { pubSub } from './pubSub';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { resolvers } from './resolvers';

import { buildSchema } from 'type-graphql';
import { config } from './config';

(async () => {
    const { app, apolloServer } = await createApp();

    const server = createServer(app);
    apolloServer.installSubscriptionHandlers(server);
    // const schema = await buildSchema({
    //     resolvers,
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
        //         path: '/graphql',
        //     },
        // );
        console.log(`server ready: http://localhost:${config.app.port}`);
    });
})();
