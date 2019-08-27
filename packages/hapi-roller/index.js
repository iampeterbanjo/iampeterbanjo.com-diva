const plugin = require('./plugin');

module.exports = {
  plugin,
  options: {
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true
  }
};
