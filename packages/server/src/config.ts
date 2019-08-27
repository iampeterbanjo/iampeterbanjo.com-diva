import catboxMongodb from 'catbox-mongodb';
import utils from './utils';

const { vars } = utils;
const { PORT, MONGODB_ADDON_URI, MONGODB_ADDON_DB } = vars;

export const manifest = {
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
};
// const manifest = {
// 	server: {
// 		host: '0.0.0.0',
// 		port: Number(PORT || 8080),
// 		routes: {
// 			files: {
// 				relativeTo: __dirname,
// 			},
// 		},
// 		router: {
// 			stripTrailingSlash: true,
// 		},
// 		debug: {
// 			request: ['*'],
// 		},
// 		cache: [
// 			{
// 				name: 'mongodb-cache',
// 				provider: {
// 					constructor: catboxMongodb,
// 					options: {
// 						uri: MONGODB_ADDON_URI,
// 						partition: MONGODB_ADDON_DB,
// 					},
// 				},
// 			},
// 		],
// 	},
// 	register: {
// 		plugins: [
// 			'./good',
// 			'./rollbar',
// 			'./hapi-dev-errors',
// 			'./hapi-inert',
// 			'./hapi-vision',
// 			'./views',
// 			'./statics',
// 			'./korin',
// 			'./pipeline',
// 			'./blog',
// 			'./cqc',
// 			'./https-here',
// 		],
// 		options: {
// 			once: true,
// 		},
// 	},
// };

// const options = {
// 	relativeTo: __dirname,
// };

// export default {
// 	manifest,
// 	options,
// };
