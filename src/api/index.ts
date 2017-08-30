
import * as Router from 'koa-router';
import peopleApi from './people';

export class Api {
  public router: Router;

  constructor() {
    this.router = new Router({ prefix: '/api' });

    this.router
      .use('/people', peopleApi.router.routes());
  }
}

export default new Api();
