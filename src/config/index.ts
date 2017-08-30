
import { defaultsDeep } from 'lodash';

export class Config {
  public env: string = process.env.NODE_ENV || 'development';
  public port: string = process.env.PORT || '9000';
  public logLevel: string = 'info';

  public keys: {
    twitter: {
      consumer_key: 'Configure in env',
      consumer_secret: 'Configure in env',
      access_token_key: 'Configure in env',
      access_token_secret: 'Configure in env',
    },
    google: {
      access_token: 'Configure in env',
    },
  };

  public database = {
    host: 'localhost',
    port: 3306,
    user: 'configure in env',
    password: 'Configure in env',
    database: 'Configure in env',
  };

  constructor() {
    try {
      let local = {};
      try {
        local = require('./env/local');
      } catch (e) {}
      const env = require(`./env/${this.env}`);

      Object.assign(this, defaultsDeep({}, env, local, this));
    } catch (e) {
      throw new Error(`Invalid env "${this.env}"`);
    }
  }
}

export default new Config();
