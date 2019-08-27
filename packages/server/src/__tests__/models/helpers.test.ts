import Lab from '@hapi/lab';
import { expect } from '@hapi/code';
import Bluebird from 'bluebird';
import utils from '../../utils';
import helpers from '../../models/helpers';

export const lab = Lab.script();

const { vars } = utils;
const { connex } = helpers;
const { test, suite } = lab;
const { MONGODB_ADDON_URI, MONGODB_ADDON_DB } = vars;

suite('Given model `connex` helper', () => {
	suite('And `isTest` is true', () => {
		test('dbName is correct', () => {
			expect(connex.dbName(true)).to.equal('test');
		});
	});

	suite('And `isTest` is false', () => {
		test('dbName is correct', () => {
			expect(connex.dbName()).to.equal(MONGODB_ADDON_DB);
		});
	});

	test('uri is correct', () => {
		expect(connex.uri).to.equal(MONGODB_ADDON_URI);
	});

	suite('And `connex.options`', () => {
		const { options } = connex;

		test('useNewUrlParser is true', () => {
			expect(options.useNewUrlParser).to.equal(true);
		});

		test('dbName is correct', () => {
			expect(options.dbName).to.equal('test');
		});

		test('promise library is Bluebird', () => {
			expect(options.promiseLibrary).to.equal(Bluebird);
		});
	});
});
