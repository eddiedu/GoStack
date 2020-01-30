import { Router } from 'express';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware); // somente as rotas abaixo vão exigir autenticação

routes.put('/users', UserController.update);

routes.post('/recipients', RecipientController.store);

export default routes;