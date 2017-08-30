
import * as Koa from 'koa';
import connection from './services/connection';
import config from './config';
import api from './api';
import logger, { Logger } from './services/logger';
import * as chalk from 'chalk';
import * as bodyParser from 'koa-bodyparser';
import * as jsend from './utils/jsend';

export class Server {
  public koa: Koa;

  constructor() {
    this.koa = new Koa();

    this.middleware();
    this.koa.use(api.router.routes());
  }

  async start() {
    await connection.db.sync();

    await new Promise((resolve) => {
      this.koa.listen(config.port, () => resolve());
    });
  }

  private middleware() {
    const httpLogger = new Logger(chalk.yellow('HTTP'));
    this.koa.use(async (ctx, next) => {
      httpLogger.verbose('--in->', ctx.method, ctx.url);
      await next();
      httpLogger.verbose('<-out-', ctx.method, ctx.url, ctx.status);
    });

    this.koa.use(bodyParser());

    this.koa.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        if (error.status < 500) {
          logger.verbose(`${error.name}: ${error.message}`);
          ctx.status = error.status;
          ctx.body = jsend.fail(error.message);
        } else {
          logger.error(error);
          ctx.status = error.status || 500;
          ctx.body = jsend.error();
          // ctx.app.emit('error', error, ctx);
        }
      }
    });
  }
}

export default new Server();
