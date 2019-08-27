import Lab from '@hapi/lab';
import { expect } from '@hapi/code';

import utils from '../utils';

export const lab = Lab.script();
const { suite, test } = lab;
const { time, getCache } = utils;

suite('getCache', () => {
	test('default cache is expected', () => {
		const defaultCache = {
			expiresIn: time.oneDay,
			staleIn: time.tenSeconds,
			staleTimeout: time.oneHundredMilliseconds,
			generateTimeout: time.oneMinute,
			cache: 'mongodb-cache',
		};

		expect(defaultCache).to.equal(getCache());
	});

	[
		{
			expiresIn: 100,
		},
		{
			staleIn: 0,
		},
		{
			cache: 'random',
		},
	].forEach(options => {
		test(`cache is correct with ${options} options `, () => {
			const cache = getCache(options);

			// @ts-ignore
			expect(cache).to.include(options);
		});
	});
});
