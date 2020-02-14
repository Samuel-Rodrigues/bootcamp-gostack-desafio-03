import { Router } from 'express';

import multer from 'multer';

import multerConfig from './config/multer';

// importe dos controllers
import UserController from './app/controllers/UserController';

import SessionController from './app/controllers/SessionController';

import RecipientController from './app/controllers/RecipienteController';

import DeliveryManController from './app/controllers/DeliveryManController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliverySent from './app/controllers/DeliverySent';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// rotas propriamente dita
routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);
routes.post('/sessions', SessionController.store);

// Recipient
routes.post('/recipient', authMiddleware, RecipientController.store);
routes.put('/recipient/:id', authMiddleware, RecipientController.update);
routes.get('/recipient', authMiddleware, RecipientController.index);

// DelivaryMan
routes.post('/delivarymans', authMiddleware, DeliveryManController.store);
routes.get('/delivarymans', authMiddleware, DeliveryManController.index);
routes.delete(
  '/delivarymans/:id',
  authMiddleware,
  DeliveryManController.delete
);
routes.put(
  '/delivarymans/:id',
  authMiddleware,
  upload.single('file'),
  DeliveryManController.update
);
// Middlewares
routes.get('/files', FileController.index);
routes.post(
  '/files',
  authMiddleware,
  upload.single('file'),
  FileController.store
);

// Delivery
routes.post('/deliverys', authMiddleware, DeliveryController.store);
routes.get('/deliverys', authMiddleware, DeliveryController.index);
routes.put('/deliverys/:id', authMiddleware, DeliveryController.update);
routes.delete('/deliverys/:id', authMiddleware, DeliveryController.delete);

// DeliverySent
routes.post('/deliverySent/:id', authMiddleware, DeliverySent.store);
routes.put('/deliverySent/:id/end', authMiddleware, DeliverySent.update);

export default routes;
