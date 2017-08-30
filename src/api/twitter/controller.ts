
import { Context as Ctx } from 'koa';
import twitterModel from './model';
import * as jsend from '../../utils/jsend';

export class TwitterController {
  async getRecords(ctx: Ctx) {
    const personId = ctx.params.id;

    const records = await twitterModel.getRecords({ personId });

    ctx.body = jsend.success(records);
  }
}

export default new TwitterController();
