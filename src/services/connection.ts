
import * as Sequelize from 'sequelize';
import config from '../config';

export class Connection {
  public db: Sequelize.Sequelize;

  constructor() {
    this.db = new Sequelize(config.database.database, config.database.user, config.database.password, {
      host: config.database.host,
      port: config.database.port,
      dialect: 'mysql',
      logging: false,
    });
  }
}

export default new Connection();
