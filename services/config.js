
module.exports = require('rc')('populr', {
  api: {
    log: {
      level: 'error',
    },
    port: 9001,
  },
}).api;
