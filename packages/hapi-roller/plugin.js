const Rollbar = require('rollbar');
const { preResponse } = require('./helpers');

const ENVIRONMENT = process.env.NODE_ENV || 'development';

module.exports = {
  name: 'rollbar',
  version: '1.0.0',
  register: (server, options) => {
    const rollbar = new Rollbar(options);

    server.ext('onPreResponse', (request, h) =>
      preResponse({ request, h, rollbar })
    );
    server.expose('rollbar', rollbar);
    rollbar.log(`Rollbar: ${ENVIRONMENT}`);

    return Promise.resolve();
  }
};
