import { createServer } from 'http';
import { createApp } from './app';
import { config } from './config';

(async () => {
    const { app, apolloServer, sequelize } = await createApp();

    const httpServer = createServer(app);
    apolloServer.installSubscriptionHandlers(httpServer);
    httpServer.listen(config.app.port, () => {
        console.info(`server ready: http://localhost:${config.app.port}`);
    });

    process.on('SIGTERM', () => {
        httpServer.close(async () => {
            console.info('Http server closed.');
            await sequelize.close();
            process.exit(0);
        });
    });
})();
