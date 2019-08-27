import mongoose from 'mongoose';
import util from 'util';
import helpers from './helpers';
import TopTrack from './TopTrack';
import TopTracksRaw from './TopTracksRaw';
import Profile from './Profile';

mongoose.connect[util.promisify.custom] = (error, db) => {
	return new Promise((resolve, reject) => {
		if (error) return reject(error);
		return resolve(db);
	});
};

export default {
	name: 'models',
	version: '1.0.0',
	register: async server => {
		const { uri, options } = helpers.connex;
		try {
			// @ts-ignore for Bluebird
			const { connection } = await mongoose.connect(uri, options);
			server.app.db = {
				korin: {
					link: connection.db,
					TopTrack,
					Profile,
				},
				pipeline: {
					link: connection.db,
					TopTracksRaw,
				},
			};
		} catch (error) {
			console.warn(error);
		}
	},
};
