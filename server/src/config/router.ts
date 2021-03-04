import { Router } from 'express';
import { config } from '.';

const configRouter = Router();

configRouter.get('/config', (request, response) => {
    if (request.headers['admin-secret'] !== config.app.admin.secret) {
        return response.status(401).json({
            error: 'invalid secret',
            secret: request.headers['admin-secret'],
        });
    }
    return response.json(config);
});

export { configRouter };
