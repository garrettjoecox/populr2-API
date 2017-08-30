
import twitterSchema from './schema';
import * as _ from 'lodash';
import { NotFoundError } from '../../utils/errors';
import { parseTweet } from './utils';

export class TwitterModel {
  async getRecords(query: object) {
    const records = await twitterSchema.findAll({ where: query, order: [['createdAt', 'DESC']] });

    return records.map(record => parseTweet(record.get()));
  }

  async createRecord(payload: object) {
    const newRecordProps = <{ personId: number, followers: number, tweet: string }>_.pick(payload, ['personId', 'followers', 'tweet']);

    const record = await twitterSchema.create(newRecordProps);

    return parseTweet(record.get());
  }

  async getRecord(id: number) {
    const record = await twitterSchema.find({ where: { id } });

    if (!record) throw new NotFoundError('Twitter record not found');

    return parseTweet(record.get());
  }

  async destroyRecord(id: number) {
    const record = await this.getRecord(id);

    await twitterSchema.destroy({ where: { id } });

    return record;
  }
}

export default new TwitterModel();
