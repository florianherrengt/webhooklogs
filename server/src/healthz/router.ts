import { Router } from 'express';
import { sequelize } from '../models';
import { redisClient } from '../redis';

export const healhtzRouter = Router();

healhtzRouter.get('/healthz', async (_, response) => {
    try {
        await sequelize.authenticate();
        await new Promise((resolve, reject) =>
            redisClient.ping((error, result) =>
                error ? reject(error) : resolve(result),
            ),
        );
        response.json({ ok: 1 });
    } catch (error) {
        response.status(500).send(error);
    }
});
