const rollbarErrorHandler = (rollbarError, rollbar) => {
  if (rollbarError) {
    rollbar.log(`Error reporting to rollbar, ignoring: ${rollbarError}`);
  }
};

const errorLogger = ({ error, rollbar, request, callback }) => {
  if (error instanceof Error) {
    return rollbar.error(error, request, callback);
  }
  return rollbar.error(`Error: ${error}`, request, callback);
};

const preResponse = ({ request, h, rollbar }) => {
  const { response } = request;
  if (!response.isBoom) {
    return h.continue;
  }

  errorLogger({ error: response, rollbar, request, callback: errorLogger });

  return h.continue;
};

module.exports = {
  preResponse,
  rollbarErrorHandler,
  errorLogger
};
