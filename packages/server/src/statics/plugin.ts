export default {
	name: 'serve-static-files',
	version: '1.0.0',
	register: (server, { rootPath, cssPath, jsPath, imagePath }) => {
		server.dependency('inert');

		server.route({
			path: '/images/{path*}',
			method: 'GET',
			handler: {
				directory: {
					path: imagePath,
					redirectToSlash: false,
					listing: false,
					index: false,
				},
			},
		});

		server.route({
			path: '/css/{path*}',
			method: 'GET',
			handler: {
				directory: {
					path: cssPath,
					redirectToSlash: false,
					listing: false,
					index: false,
				},
			},
		});

		server.route({
			path: '/js/{path*}',
			method: 'GET',
			handler: {
				directory: {
					path: jsPath,
					redirectToSlash: false,
					listing: false,
					index: false,
				},
			},
		});

		server.route({
			path: '/{path*}',
			method: 'GET',
			handler: {
				directory: {
					path: rootPath,
					redirectToSlash: false,
					listing: false,
					index: true,
				},
			},
		});
	},
};
