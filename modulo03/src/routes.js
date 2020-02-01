import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import ProviderController from './app/controllers/ProviderController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import providerMiddleware from './app/middlewares/provider';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware); // somente as rotas abaixo vão exigir autenticação

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', providerMiddleware, NotificationController.index);
routes.put(
  '/notifications/:id',
  providerMiddleware,
  NotificationController.update
);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
