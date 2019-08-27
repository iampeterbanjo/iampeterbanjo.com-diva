import { expect } from '@hapi/code';
import Lab from '@hapi/lab';
import utils from '../../utils';
import routes from '../../korin/routes';

export const lab = Lab.script();
const { test, suite } = lab;
const { slugger } = utils;

suite('routes: korin api', () => {
	test('when requesting tracks', () => {
		const result = routes.v1.get_korin_tracks();

		// @ts-ignore
		expect(result).to.include({
			method: 'GET',
			path: '/v1/korin/tracks',
			url: '/v1/korin/tracks',
		});
	});

	test('when requesting artist profile', () => {
		const artist = 'Sofia Reyes';
		const track = 'R.I.P';
		const result = routes.v1.get_korin_profiles({ artist, track });
		const artistParam = slugger.parse(artist);
		const trackParam = slugger.parse(track);

		// @ts-ignore
		expect(result).to.include({
			method: 'GET',
			path: '/v1/korin/{artist}/{track}',
			url: `/v1/korin/${artistParam}/${trackParam}`,
		});
	});

	test('when requesting artist profile method and path', () => {
		const result = routes.v1.get_korin_profiles();

		// @ts-ignore
		expect(result).to.include({
			method: 'GET',
			path: '/v1/korin/{artist}/{track}',
		});
	});
});
