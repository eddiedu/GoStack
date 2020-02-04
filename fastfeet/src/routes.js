import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import DeliverymanDeliveriesController from './app/controllers/DeliverymanDeliveriesController';
import DistributorController from './app/controllers/DistributorController';

import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import administratorMiddleware from './app/middlewares/administrator';
import deliverymanMiddleware from './app/middlewares/deliveryman';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware); // somente as rotas abaixo vão exigir autenticação

routes.post('/users', administratorMiddleware, UserController.store);
routes.put('/users/:id', UserController.update);

routes.get('/deliverymen', DeliverymanController.index);
routes.get(
  '/deliverymen/:id/deliveries',
  deliverymanMiddleware,
  DeliverymanDeliveriesController.index
);
routes.get('/delivery/:id/problems', DeliveryProblemController.index);
routes.post(
  '/delivery/:id/cancel-delivery',
  administratorMiddleware,
  DistributorController.store
);

routes.post(
  '/delivery/:id/problems',
  deliverymanMiddleware,
  DeliverymanController.store
);

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
