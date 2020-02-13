import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipiente from '../app/models/Recipiente';

import databaseConfig from '../config/database';

const models = [User, Recipiente];

class DataBase {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new DataBase();
