import plugin from './plugin';
import utils from '../utils';

const { vars } = utils;

export default {
	plugin,
	options: {
		accessToken: vars.ROLLBAR_ACCESS_TOKEN,
		captureUncaught: true,
		captureUnhandledRejections: true,
	},
};
