
import logger from '../services/logger';
import peopleSchema from '../api/people/schema';
import twitterSchema from '../api/twitter/schema';

export default async () => {
  logger.info('Starting dropTables');
  await peopleSchema.drop();
  await twitterSchema.drop();
  logger.info('dropTables Complete');
};
