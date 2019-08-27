import Lab from '@hapi/lab';
import { expect } from '@hapi/code';

export const lab = Lab.script();
const { test, suite, before } = lab;

import factory from '.';

suite('Given factory', () => {
	suite('And topTracks', () => {
		before(({ context }) => {
			context.count = Math.ceil((1 - Math.random()) * 10);
			context.topTracks = factory.topTrack(context.count);
		});

		test('length are correct', ({ context }) => {
			const { count, topTracks } = context;

			expect(topTracks.length).to.equal(count);
		});

		test('items are correct', ({ context }) => {
			context.topTracks.forEach(topTrack => {
				const { artist, title, image, lastFmUrl, profileUrl } = topTrack;
				const description = `when ${artist} - ${title}`;

				expect(artist, description).to.be.a.string();
				expect(title, description).to.be.a.string();
				expect(image, description).to.be.a.string();
				expect(lastFmUrl, description).to.be.a.string();
				expect(profileUrl, description).not.to.exist();
			});
		});
	});
});
