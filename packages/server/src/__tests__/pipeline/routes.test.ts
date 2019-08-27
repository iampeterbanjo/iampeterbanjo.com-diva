import { expect } from '@hapi/code';
import Lab from '@hapi/lab';
import routes from '../../pipeline/routes';

export const lab = Lab.script();
const { test, suite } = lab;

suite('Given pipeline routes', () => {
	test('/topTracks/extract', () => {
		const result = routes.v1.extract_top_tracks();

		// @ts-ignore
		expect(result).to.include({
			method: 'GET',
			path: '/v1/pipeline/extract/topTracks',
			url: '/v1/pipeline/extract/topTracks',
		});
	});
});
