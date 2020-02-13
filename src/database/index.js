import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipiente from '../app/models/Recipiente';
import Deliveryman from '../app/models/Deliveryman';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [User, Recipiente, Deliveryman, File];

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
