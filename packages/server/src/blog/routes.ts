import utils from '../utils';

const { clientel } = utils;
const get_blog_posts = () => {
	const url = '/v1/blog/posts';
	const method = 'GET';

	return {
		url,
		path: url,
		method,
		client: () => clientel.api(url, { method }),
	};
};

/**
 * Get blog details
 * @param {string} [filename] post markdown filename
 */
const get_blog_details = (filename = '') => {
	const path = '/v1/blog/posts/{post}';
	const url = `/v1/blog/posts/${filename}`;
	const method = 'GET';

	return {
		url,
		path,
		method,
		client: () => clientel.api(url, { method }),
	};
};

export default {
	v1: {
		get_blog_posts,
		get_blog_details,
	},
};
