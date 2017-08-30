
const server = require('./dist').default;

server.start()
  .catch(e => console.error(e));
