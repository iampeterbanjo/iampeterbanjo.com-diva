import Wreck from '@hapi/wreck';
import plugin from './api';

const client = Wreck.defaults({ baseUrl: process.env.CQC_API_URL });

export default {
	plugin,
	options: { client },
};
