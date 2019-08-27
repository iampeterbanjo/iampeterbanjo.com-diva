import jsonata from 'jsonata';

import routes from './routes';
import * as blogHelpers from '../blog/helpers';
import korinHelpers from '../korin/helpers';
import utils from '../utils';

const { vars } = utils;
const { topTracksPath } = vars;

const viewBlogPost = (post: string): Object =>
	blogHelpers.getBlogContents(post);

const viewBlogList = () => blogHelpers.getBlogFiles();

/**
 * Parse top tracks to get artist, track, image etc.
 * @typedef Tracks
 * @property {string} artist name
 * @property {string} title track title
 * @property {string} image url to track image
 * @property {string} url uri to LastFM track
 * @property {string} profileUrl url to personality profile
 *
 * @return {Array<Tracks>} topTracks Top 50 tracks from LastFM API
 */
const parseTopTracks = topTracks => {
	const expression = jsonata(topTracksPath);

	expression.registerFunction('getProfileUrl', (artist, track) => {
		const { url } = routes.get_korin_profiles({ artist, track });
		return url;
	});
	const tracks = expression.evaluate(topTracks);

	return tracks;
};

const viewTopTracks = async () => {
	const topTracks = await korinHelpers.getChartTopTracks();
	return parseTopTracks(topTracks);
};

/**
 * Get track profile
 * @typedef ViewTrack
 * @property {string} artist name
 * @property {string} track title
 *
 * @param {ViewTrack} info
 */
const viewTrackProfile = async ({ artist, track }) => {
	const { profile, summary } = await korinHelpers.getProfileByArtistAndTrack({
		artist,
		track,
	});

	return {
		profile: JSON.stringify(profile),
		summary,
		artist,
		track,
	};
};

export default {
	viewBlogPost,
	viewBlogList,
	viewTopTracks,
	viewTrackProfile,
	parseTopTracks,
};
