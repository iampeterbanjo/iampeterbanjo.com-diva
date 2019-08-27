import mongoose from 'mongoose';

const TopTracksRawSchema = new mongoose.Schema({
	name: String,
	duration: String,
	playcount: String,
	subscribers: String,
	mbid: String,
	url: String,
	streamable: {
		'#text': String,
		fulltrack: String,
	},
	artist: {
		name: String,
		mbid: String,
		url: String,
	},
	image: [
		{
			'#text': String,
			size: String,
		},
	],
});

export default mongoose.model('TopTracksRaw', TopTracksRawSchema);
