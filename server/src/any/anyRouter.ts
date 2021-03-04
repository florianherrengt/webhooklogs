import path from 'path';
import express, { Router } from 'express';
import { config } from '../config';

export const anyRouter = Router();

if (config.app.serveStaticFiles) {
    anyRouter.use(
        express.static(path.join(__dirname, '../../../../web/build')),
    );
    anyRouter.get('*', function (_, res) {
        res.sendFile(
            path.join(__dirname, '../../../../web/build', 'index.html'),
        );
    });
}
