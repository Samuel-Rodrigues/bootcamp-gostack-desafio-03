import { Router } from 'express';

import multer from 'multer';

import multerConfig from './config/multer';

// importe dos controllers
import UserController from './app/controllers/UserController';

import SessionController from './app/controllers/SessionController';

import RecipientController from './app/controllers/RecipienteController';

import DeliveryManController from './app/controllers/DeliveryManController';
import DeliveredController from './app/controllers/Delivered';
import DeliveryController from './app/controllers/DeliveryController';
import DeliverySent from './app/controllers/DeliverySent';
import DeliveryFinishedController from './app/controllers/DeliveryFinishedController';
import FileController from './app/controllers/FileController';
import DeliveryCanceled from './app/controllers/DeliveryCanceled';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';
import DeliveryCeleledByProblems from './app/controllers/DeliveryCanceledByProblems';

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
routes.get('/delivarymans/:id', authMiddleware, DeliveryManController.show);
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

// Delivered
routes.get('/deliverymans/:id/delivered', DeliveredController.index);

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
routes.put('/deliveryman/:id/deliverySent', DeliverySent.update);

routes.put(
  '/deliveryman/:id/deliveryfinished',
  DeliveryFinishedController.store
);

// Delivery Canceled
routes.put('/delivery/:id/canceled', DeliveryCanceled.update);

// Delivery Problems
routes.post('/delivery/problems', DeliveryProblemsController.store);

routes.put(
  '/delivery/:id/canceledbyproblems',
  DeliveryCeleledByProblems.update
);

routes.get('/delivery/canceledbyproblems', DeliveryCeleledByProblems.index);
export default routes;
