export default {
	name: 'cqc-api',
	version: '1.0.0',
	register: (server, { client }) => {
		server.route({
			path: '/cqc/providers',
			method: 'GET',
			handler: async () => (await client.get('/providers')).body,
		});
	},
};
