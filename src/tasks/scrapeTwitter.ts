
import logger from '../services/logger';
import peopleModel from '../api/people/model';
import twitterModel from '../api/twitter/model';
import config from '../config';
import * as _ from 'lodash';
const twitterClient: any = require('twitter');

export default async () => {
  logger.info('Starting scrapeTwitter');
  const twitter = new twitterClient(config.keys.twitter);

  const people = await peopleModel.getPeople();
  const handleMap = _.keyBy(people, 'twitterHandle');

  const chunks = _.chunk(people, 100);

  const results = await chunks.reduce((previous, chunk) => previous.then((acc) => {
    const handles = _.map(chunk, 'twitterHandle').join();
    return twitter.get('users/lookup', { screen_name: handles })
      .then((res: any) => acc.concat(res));
  }), Promise.resolve([]));

  const stripped = results.map((r: any) => {
    const s: any = _.pick(r, ['screen_name', 'followers_count', 'status']);
    s.status = _.pick(s.status, ['created_at', 'id', 'text', 'retweet_count', 'favorite_count']);
    return s;
  });

  const mapped = stripped.map((s: any) => {
    return {
      personId: handleMap[s.screen_name].id,
      followers: s.followers_count,
      tweet: JSON.stringify(s.status),
    };
  });

  await mapped.reduce((previous: any, payload: any) => previous.then(async () => {
    await twitterModel.createRecord(payload);

    const records = await twitterModel.getRecords({ personId: payload.personId });

    return Promise.all(records.slice(24).map(r => twitterModel.destroyRecord(r.id)));
  }), Promise.resolve());

  logger.info('scrapeTwitter Complete');
};
