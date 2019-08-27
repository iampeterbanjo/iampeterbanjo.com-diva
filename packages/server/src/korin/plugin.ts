import Boom from 'boom';
import routes from './routes';

export default {
	name: 'korin-api',
	version: '1.0.0',
	register: (server, { methods }) => {
		server.method(methods);

		const getTracksRoute = routes.v1.get_korin_tracks();
		server.route({
			path: getTracksRoute.path,
			method: getTracksRoute.method,
			handler: async () => {
				try {
					const tracks = await server.methods.korin.getChartTopTracks();

					return tracks;
				} catch (error) {
					return Boom.boomify(error);
				}
			},
		});

		const getProfileRoute = routes.v1.get_korin_profiles();
		server.route({
			path: getProfileRoute.path,
			method: getProfileRoute.method,
			handler: async request => {
				try {
					const { artist, track } = request.params;
					const artistDecoded = decodeURI(artist);
					const trackDecoded = decodeURI(track);

					const {
						profile,
						summary,
					} = await server.methods.korin.getProfileByArtistAndTrack({
						artist: artistDecoded,
						track: trackDecoded,
					});

					return { profile, summary };
				} catch (error) {
					return Boom.boomify(error);
				}
			},
		});
	},
};
