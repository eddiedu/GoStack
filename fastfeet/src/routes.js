import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import DeliveryController from './app/controllers/DeliveryController';

import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware); // somente as rotas abaixo vão exigir autenticação

routes.put('/users', UserController.update);

routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

routes.get('/deliver', DeliveryController.index);
routes.post('/deliver', DeliveryController.store);
routes.put('/deliver/:id', DeliveryController.update);
routes.delete('/deliver/:id', DeliveryController.delete);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
