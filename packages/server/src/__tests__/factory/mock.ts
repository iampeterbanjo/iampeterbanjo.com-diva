export const korinGetTopTracks = async ({ server, plugin, fn }) => {
	const methods = [
		{
			name: 'korin.getChartTopTracks',
			method: fn,
		},
	];
	await server.register({
		plugin,
		options: { methods },
	});
};

export const method = async ({ server, plugin, name, fn }) => {
	switch (name) {
		case 'korin.getChartTopTracks':
			return korinGetTopTracks({ server, plugin, fn });
		default:
			return null;
	}
};
