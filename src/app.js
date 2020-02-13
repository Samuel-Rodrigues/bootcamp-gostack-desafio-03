import express from 'express';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    // middleware
    this.middleware();

    // routes
    this.routes();
  }

  middleware() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
