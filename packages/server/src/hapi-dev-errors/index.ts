import plugin from 'hapi-dev-errors';

export default {
	plugin,
	options: {
		showErrors: process.env.NODE_ENV !== 'production',
	},
};
