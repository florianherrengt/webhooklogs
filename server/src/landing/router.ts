import { Router } from 'express';
import path from 'path';

export const landingRouter = Router();

landingRouter.get('/', (_, response) => {
    response.sendFile(
        path.join(__dirname, '../../../../landing', 'index.html'),
    );
});
