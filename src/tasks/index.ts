
import logger from '../services/logger';

const tasks = process.argv.slice(2);
const available: { [index: string]: Function } = {
  dropTables: () => require('./dropTables').default(),
  scrapeTwitter: () => require('./scrapeTwitter').default(),
  scrapeNews: () => require('./scrapeNews').default(),
};

if (tasks.length) {
  Promise.resolve()
    .then(() => tasks.reduce((previous, task) => previous.then(() => {
      if (task in available) return available[task]();
      return Promise.reject(`Invalid task: ${task}`);
    }), Promise.resolve()))
    .catch(e => logger.error(e))
    .then(() => process.exit());
} else help();

function help() {
  logger.spacer();
  logger.log('Tasks Available:');
  Object.keys(available).forEach(task => logger.log(`- ${task}`));
  logger.spacer();
}
