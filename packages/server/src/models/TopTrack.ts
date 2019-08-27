import mongoose from 'mongoose';
import utils from '../utils';

const { slugger } = utils;
const TopTrackSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	image: String,
	artist: {
		type: String,
		required: true,
	},
	lastFmUrl: {
		type: String,
		required: true,
	},
	profileUrl: { type: String },
});

TopTrackSchema.pre('save', function save(next) {
	// @ts-ignore
	this.profileUrl = slugger.slugify(`${this.artist} ${this.title}`);
	next();
});

export default mongoose.model('TopTrack', TopTrackSchema);
