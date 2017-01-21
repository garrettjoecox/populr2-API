
const express = require('express');

const app = express();

require('./services')(app);
require('./middleware')(app);
require('./api')(app);

db.connection.sync()
  .then(() => log.info('Database connected'))
  .then(() => new Promise(resolve => app.listen(config.port, () => resolve())))
  .then(() => log.info(`Listening on ${config.port}...`))
  .catch(e => log.error(e));
