import faker from 'faker';
import utils from '../../utils';

const { slugger } = utils;
const title = faker.random.words();
const artist = faker.name.findName();

export default {
	artist,
	title,
	summary: faker.lorem.sentences(),
	image: faker.random.image(),
	profileUrl: slugger.slugify(`${artist} ${title}`),
	lastFmUrl: faker.internet.url(),
};
