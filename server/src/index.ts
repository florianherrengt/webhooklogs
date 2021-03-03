import { createServer } from 'http';
import { createApp } from './app';
import { pubSub } from './pubSub';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { resolvers } from './resolvers';

import { buildSchema } from 'type-graphql';
import { config } from './config';

(async () => {
    const { app, apolloServer, sequelize } = await createApp();

    const httpServer = createServer(app);
    apolloServer.installSubscriptionHandlers(httpServer);
    httpServer.listen(config.app.port, () => {
        console.log(`server ready: http://localhost:${config.app.port}`);
    });

    process.on('SIGTERM', () => {
        httpServer.close(async () => {
            console.log('Http server closed.');
            await sequelize.close();
            process.exit(0);
        });
    });
})();
