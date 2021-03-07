import bodyParser from 'body-parser';
import { Router } from 'express';
import { config } from '.';
import { matrix } from '../helpers';

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

configRouter.post('/config/matrix', bodyParser.json(), (request, response) => {
    if (request.headers['admin-secret'] !== config.app.admin.secret) {
        return response.status(401).json({
            error: 'invalid secret',
            secret: request.headers['admin-secret'],
        });
    }
    if (!request.body.message) {
        return response.status(400).json({ error: 'no message' });
    }
    matrix.sendMessage(request.body.message);
    return response.sendStatus(200);
});

export { configRouter };
