import { Router } from 'express';

// importe dos controllers
import UserController from './app/controllers/UserController';

import SessionController from './app/controllers/SessionController';

import RecipientController from './app/controllers/RecipienteController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// rotas propriamente dita
routes.post('/users', UserController.store);

routes.put('/users', authMiddleware, UserController.update);

routes.post('/sessions', SessionController.store);

// Recipient
routes.post('/recipient', authMiddleware, RecipientController.store);
routes.put('/recipient/:id', authMiddleware, RecipientController.update);

export default routes;
