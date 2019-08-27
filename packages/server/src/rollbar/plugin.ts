import Rollbar from 'rollbar';
import * as helpers from './helpers';
import utils from '../utils';

const { vars } = utils;
const { preResponse } = helpers;

export default {
	name: 'rollbar',
	version: '1.0.0',
	register: (server, options) => {
		const rollbar = new Rollbar(options);

		server.ext('onPreResponse', (request, h) =>
			preResponse({ request, h, rollbar }),
		);
		server.expose('rollbar', rollbar);
		rollbar.log(`Rollbar: ${vars.ENVIRONMENT}`);

		return Promise.resolve();
	},
};
