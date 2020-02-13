import { Router } from 'express';

import multer from 'multer';

import multerConfig from './config/multer';

// importe dos controllers
import UserController from './app/controllers/UserController';

import SessionController from './app/controllers/SessionController';

import RecipientController from './app/controllers/RecipienteController';

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

// Middlewares

routes.post(
  '/files',
  authMiddleware,
  upload.single('file'),
  FileController.store
);

export default routes;
