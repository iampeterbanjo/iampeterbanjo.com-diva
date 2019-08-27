import topTrack from './topTrack';
import profile from './profile';
import * as mock from './mock';

interface TopTrack {
	title: string;
	artist: string;
}

const generate = (count: number, item: Object) => {
	const result: TopTrack[] = [];
	let limit = count;

	while (limit) {
		limit -= 1;
		result.push(Object.assign({} as TopTrack, item));
	}

	return result;
};

const factory = {
	topTrack: count => generate(count, topTrack),
	profile: count => generate(count, profile),
	mock,
};

export default factory;
