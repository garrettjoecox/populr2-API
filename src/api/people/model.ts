
import peopleSchema from './schema';
import * as _ from 'lodash';
import { NotFoundError } from '../../utils/errors';
import twitterSchema from '../twitter/schema';

export class PeopleModel {
  async getPeople() {
    const people = await peopleSchema.findAll();

    return people.map(person => person.get());
  }

  async createPerson(payload: object) {
    const newPersonProps = <{ displayName: string, twitterHandle: string }>_.pick(payload, ['displayName', 'twitterHandle']);

    const person = await peopleSchema.create(newPersonProps);

    return person.get();
  }

  async getPerson(id: number) {
    const person = await peopleSchema.find({ where: { id } });

    if (!person) throw new NotFoundError('Person not found');

    return person.get();
  }

  async updatePerson(id: number, payload: object) {
    const newPersonProps = <{ displayName: string, twitterHandle: string }>_.pick(payload, ['displayName', 'twitterHandle']);

    await peopleSchema.update(newPersonProps, { where: { id } });

    return this.getPerson(id);
  }

  async destroyPerson(id: number) {
    const person = await this.getPerson(id);

    await peopleSchema.destroy({ where: { id } });

    return person;
  }
}

export default new PeopleModel();
