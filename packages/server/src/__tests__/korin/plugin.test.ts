import Hapi from '@hapi/hapi';
import Lab from '@hapi/lab';
import { expect } from '@hapi/code';
import sinon from 'sinon';

import factory from '../factory';
import plugin from '../../korin/plugin';
import routes from '../../korin/routes';

export const lab = Lab.script();

const topTracksData = require('../fixtures/lastfm-topTracks.json');
const { suite, test, before } = lab;
const server = Hapi.Server();

suite('korin tracks API', async () => {
	before(async () => {
		await factory.mock.method({
			server,
			name: 'korin.getChartTopTracks',
			plugin,
			fn: sinon.stub().resolves(topTracksData),
		});
	});

	test('requesting korin tracks gives expected results', async () => {
		const { method, url } = routes.v1.get_korin_tracks();

		const response = await server.inject({
			method,
			url,
		});

		expect(response.statusCode).to.equal(200);
	});
});
