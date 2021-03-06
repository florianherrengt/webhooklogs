import { Router } from 'express';
import path from 'path';

export const landingRouter = Router();

landingRouter.get('/', (_, response) => {
    response.sendFile(
        path.join(__dirname, '../../../../landing', 'index.html'),
    );
});
landingRouter.get('/privacy', (_, response) => {
    response.sendFile(
        path.join(__dirname, '../../../../landing', 'privacy.html'),
    );
});
landingRouter.get('/terms', (_, response) => {
    response.sendFile(
        path.join(__dirname, '../../../../landing', 'terms.html'),
    );
});
