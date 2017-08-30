
import { Context as Ctx } from 'koa';
import peopleModel from './model';
import * as jsend from '../../utils/jsend';
import * as _ from 'lodash';
import { controller as validate } from './validation';

export class PeopleController {
  async getPeople(ctx: Ctx) {
    const people = await peopleModel.getPeople();

    ctx.body = jsend.success(people);
  }

  async createPerson(ctx: Ctx) {
    const payload = <{ displayName: string, twitterHandle: string }>_.pick(ctx.request.body, ['displayName', 'twitterHandle']);

    await validate.createPerson(payload);

    const person = await peopleModel.createPerson(payload);

    ctx.body = jsend.success(person);
  }

  async getPerson(ctx: Ctx) {
    const id = ctx.params.id;

    const person = await peopleModel.getPerson(id);

    ctx.body = jsend.success(person);
  }

  async updatePerson(ctx: Ctx) {
    const id = ctx.params.id;
    const payload = <{ displayName: string, twitterHandle: string }>_.pick(ctx.request.body, ['displayName', 'twitterHandle']);

    await validate.updatePerson(id, payload);

    const person = await peopleModel.updatePerson(id, payload);

    ctx.body = jsend.success(person);
  }

  async destroyPerson(ctx: Ctx) {
    const id = ctx.params.id;

    const person = await peopleModel.destroyPerson(id);

    ctx.body = jsend.success(person);
  }
}

export default new PeopleController();
