import { expect } from '@hapi/code';
import Lab from '@hapi/lab';
import utils from '../utils';

export const lab = Lab.script();

const { slugger } = utils;
const { test, suite } = lab;

suite('parsing and reversing', () => {
	[
		{
			text: 'Ariana Grande',
			parsed: encodeURI('Ariana Grande'),
		},
	].forEach(({ text, parsed }) => {
		test(`that ${text} should return ${parsed} and can be unparsed`, () => {
			const result = slugger.parse(text);

			expect(result).to.equal(parsed);
			expect(slugger.unparse(result)).to.equal(text);
		});
	});
});
