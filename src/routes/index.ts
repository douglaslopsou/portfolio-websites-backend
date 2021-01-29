import { Router } from 'express';
import segmentsRouter from './segments.routes';
import websitesRouter from './websites.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/segments', segmentsRouter);
routes.use('/websites', websitesRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
