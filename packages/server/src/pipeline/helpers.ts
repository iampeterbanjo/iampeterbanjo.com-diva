import Joi from '@hapi/joi';
import ramda from 'ramda';

/**
 * Check TopTrack schema
 * @param {object} topTrack
 */
const checkTopTrack = topTrack => {
	const schema = Joi.object({
		title: Joi.string(),
		image: Joi.string().uri(),
		artist: Joi.string(),
		lastFmUrl: Joi.string().uri(),
	});

	return Joi.validate(topTrack, schema, { presence: 'required' });
};

/**
 * Check TopTrackRaw schema
 * @param {object} topTrackRaw
 */
const checkRawTopTrack = topTrackRaw => {
	const schema = Joi.object({
		name: Joi.string(),
		duration: Joi.string(),
		playcount: Joi.string(),
		listeners: Joi.string(),
		url: Joi.string().uri(),
		artist: Joi.object(),
		image: Joi.array(),
	});

	return Joi.validate(topTrackRaw, schema, {
		allowUnknown: true,
		presence: 'required',
	});
};

/**
 * Check track profile. Combines data for chart track info
 * and profile summary
 * @param {object} trackProfile
 */
const checkTrackProfile = trackProfile => {
	const schema = {};

	return Joi.validate(trackProfile, schema);
};

const saveRawTopTracks = async server => {
	const rawTopTracks = await server.methods.korin.getChartTopTracks();

	const tracks = ramda.pathOr(null, ['tracks', 'track'], rawTopTracks);

	if (!tracks) throw new Error('No tracks found');

	tracks.forEach(track => {
		const { error } = checkRawTopTrack(track);
		if (error) throw error;
	});

	await server.app.db.pipeline.TopTracksRaw.insertMany(tracks);
};

export default {
	checkTopTrack,
	checkRawTopTrack,
	saveRawTopTracks,
	checkTrackProfile,
};
