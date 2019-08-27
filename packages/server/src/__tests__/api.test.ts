import { expect } from '@hapi/code';
import Lab from '@hapi/lab';
import api from '../api';

export const lab = Lab.script();
const { before, test, suite } = lab;

let server;

before(async () => {
	server = await api();
});

suite('korin API', () => {
	['getProfileByArtistAndTrack', 'getChartTopTracks'].forEach(name => {
		test(`method ${name} is registered`, () => {
			const result = server.methods.korin[name];

			expect(result).to.be.a.function();
		});
	});
});

suite('blog API', () => {
	['getBlogContents', 'getBlogFiles'].forEach(name => {
		test(`method ${name} is registered`, () => {
			const result = server.methods.blog[name];

			expect(result).to.be.a.function();
		});
	});
});

suite('view API', () => {
	['topTracks', 'trackProfile'].forEach(name => {
		test(`method ${name} is registered`, () => {
			const result = server.methods.view[name];

			expect(result).to.be.a.function();
		});
	});
});
