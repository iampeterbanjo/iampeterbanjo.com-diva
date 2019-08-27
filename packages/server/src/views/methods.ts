import Crypto from 'crypto';
import helpers from './helpers';
import utils from '../utils';

const { time, getCache } = utils;
const { viewBlogPost, viewBlogList, viewTopTracks, viewTrackProfile } = helpers;
export default [
	{
		name: 'view.blogContent',
		method: viewBlogPost,
		options: {
			cache: getCache({ expiresIn: time.oneWeek }),
			generateKey: post => {
				return Crypto.createHash('sha1')
					.update(post)
					.digest('hex');
			},
		},
	},
	{
		name: 'view.blogList',
		method: viewBlogList,
		options: {
			cache: getCache({ expiresIn: time.oneWeek }),
			generateKey: () => `viewBlogList-${Date.now()}`,
		},
	},
	{
		name: 'view.topTracks',
		method: viewTopTracks,
		options: {
			cache: getCache({ expiresIn: time.oneDay }),
			generateKey: () => `viewTopTracks-${Date.now()}`,
		},
	},
	{
		name: 'view.trackProfile',
		method: viewTrackProfile,
		options: {
			cache: getCache({ expiresIn: time.oneMonth }),
			generateKey: ({ artist, track }) => {
				return Crypto.createHash('sha1')
					.update(`${artist} ${track}`)
					.digest('hex');
			},
		},
	},
];
