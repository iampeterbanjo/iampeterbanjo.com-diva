import Lab from '@hapi/lab';
import { expect } from '@hapi/code';

export const lab = Lab.script();
const { test, suite, before } = lab;

import factory from '.';

suite('Given factory', () => {
	suite('And profile', () => {
		before(({ context }) => {
			context.count = Math.ceil((1 - Math.random()) * 10);
			context.profiles = factory.profile(context.count);
		});

		test('length are correct', ({ context }) => {
			const { count, profiles } = context;

			expect(profiles.length).to.equal(count);
		});

		test('items are correct', ({ context }) => {
			context.profiles.forEach(profile => {
				const {
					artist,
					title,
					image,
					lastFmUrl,
					profileUrl,
					summary,
				} = profile;
				const description = `when ${artist} - ${title}`;

				expect(artist, description).to.be.a.string();
				expect(title, description).to.be.a.string();
				expect(summary, description).to.be.a.string();
				expect(image, description).to.be.a.string();
				expect(lastFmUrl, description).to.be.a.string();
				expect(profileUrl, description).to.be.a.string();
			});
		});
	});
});
