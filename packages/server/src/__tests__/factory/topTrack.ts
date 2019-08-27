import faker from 'faker';

const title = faker.random.words();
const artist = faker.name.findName();

export default {
	artist,
	title,
	image: faker.random.image(),
	lastFmUrl: faker.internet.url(),
};
