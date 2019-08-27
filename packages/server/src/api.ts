import catboxMongodb from 'catbox-mongodb';
import Hapi from '@hapi/hapi';
import utils from './utils';

import good from './good';
import rollbar from './rollbar';
import korin from './korin';
import blog from './blog';
import devErrors from './hapi-dev-errors';
import inert from './hapi-inert';
import vision from './hapi-vision';
import views from './views';
import statics from './statics';
import pipeline from './pipeline';
import cqc from './cqc';
import httpsHere from './https-here';

const { vars } = utils;
const { PORT, MONGODB_ADDON_URI, MONGODB_ADDON_DB } = vars;

export default async function main() {
	try {
		const server = Hapi.Server({
			host: '0.0.0.0',
			port: Number(PORT || 8080),
			routes: {
				files: {
					relativeTo: __dirname,
				},
			},
			router: {
				stripTrailingSlash: true,
			},
			debug: {
				request: ['*'],
			},
			cache: [
				{
					name: 'mongodb-cache',
					provider: {
						constructor: catboxMongodb,
						options: {
							uri: MONGODB_ADDON_URI,
							partition: MONGODB_ADDON_DB,
						},
					},
				},
			],
		});

		await Promise.all([
			server.register(good),
			server.register(rollbar),
			server.register(blog),
			server.register(devErrors),
			server.register(inert),
			server.register(vision),
			server.register(views),
			server.register(statics),
			server.register(korin),
			server.register(pipeline),
			server.register(cqc),
			server.register(httpsHere),
		]);

		return server;
	} catch (error) {
		return console.warn(error);
	}
}
