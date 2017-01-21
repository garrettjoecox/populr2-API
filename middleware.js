
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

module.exports = (app) => {
  app.use(morgan('dev', { stream: log.stream }));
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};
