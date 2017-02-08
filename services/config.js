
module.exports = require('rc')('populr', {
  api: {
    log: 'error',
    port: 9001,
  },
  twitter: {
    consumer_key: 'Configure in .populrrc',
    consumer_secret: 'Configure in .populrrc',
    access_token_key: 'Configure in .populrrc',
    access_token_secret: 'Configure in .populrrc',
  },
  google: {
    access_token: 'Configure in .populrrc',
  },
});
