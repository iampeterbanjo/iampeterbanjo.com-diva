/**
 * @typedef { 'GET' | 'POST' | 'PUT' | 'DELETE' } Verbs
 * @typedef Route
 * @property {Verbs} method REST verbs
 * @property {string} path server path
 * @property {string} url request url
 */

import utils from '../utils';

const { slugger } = utils;
const korinBaseUrl = '/projects/korin';

/**
 * Get Berserker route
 * @return {Route}
 */
const get_berserker = () => {
	const url = '/berserker';
	return {
		method: 'GET',
		path: url,
		url,
	};
};

/**
 * Get Korin tracks route
 * @return {Route}
 */
const get_korin_tracks = () => {
	const url = `${korinBaseUrl}/tracks`;
	return {
		method: 'GET',
		path: url,
		url,
	};
};

type KorinProfilesParams = {
	artist: string;
	track: string;
};

const get_korin_profiles = (options?: KorinProfilesParams) => {
	const { artist, track } = options || { artist: '', track: '' };
	const artistParam = slugger.parse(artist);
	const trackParam = slugger.parse(track);
	return {
		method: 'GET',
		path: `${korinBaseUrl}/profiles/{artist}/{track}`,
		url: `${korinBaseUrl}/profiles/${artistParam}/${trackParam}`,
	};
};

/**
 * Get blog posts route
 * @return {Route}
 */
const get_blog_posts = () => {
	const url = '/blog/posts';

	return {
		method: 'GET',
		path: url,
		url,
	};
};

const get_blog_details = (post?: string) => {
	return {
		method: 'GET',
		path: '/blog/posts/{post}',
		url: `/blog/posts/${post}`,
	};
};

/**
 * Get home page routes
 * @return Route
 */
const get_home = () => {
	return {
		method: 'GET',
		path: '/',
		url: '/',
	};
};

export default {
	get_berserker,
	get_korin_tracks,
	get_korin_profiles,
	get_blog_posts,
	get_blog_details,
	get_home,
};
