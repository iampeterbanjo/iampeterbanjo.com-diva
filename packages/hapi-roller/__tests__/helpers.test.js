import { expect } from '@hapi/code';
import Lab from '@hapi/lab';
const sinon = require('sinon');

const { preResponse, rollbarErrorHandler, errorLogger } = require('../helpers');

export const lab = Lab.script();
const { test, suite } = lab;

const MockParams = () => {
	return {
		request: {
			response: {
				isBoom: null,
			},
		},
		h: {
			continue: sinon.spy(),
		},
	};
};

const MockRollbar = () => {
	return {
		log: sinon.spy(),
		error: sinon.spy(),
	};
};

suite('rollbar helpers', () => {
	suite('Given errorLogger', () => {
		suite('And error message and rollbar instance', () => {
			test('rollbar.error is called with error message', () => {
				const rollbar = MockRollbar();
				const error = 'Ooops';
				const callback = sinon.stub();
				const request = sinon.stub();

				errorLogger({ error, rollbar, request, callback });
				const [first, second, third] = rollbar.error.args[0];

				expect(first).to.contain(`Error: ${error}`);
				expect(second).to.equal(request);
				expect(third).to.equal(callback);
			});
		});

		suite('And Error and rollbar instance', () => {
			test('rollbar.error is called with Error', () => {
				const rollbar = MockRollbar();
				const error = new Error('Oops');
				const callback = sinon.stub();
				const request = sinon.stub();

				errorLogger({ error, rollbar, callback, request });
				const [first, second, third] = rollbar.error.args[0];

				expect(first).to.equal(error);
				expect(second).to.equal(request);
				expect(third).to.equal(callback);
			});
		});
	});

	suite('Given rollbarErrorHandler', () => {
		suite('And NO `rollbarError`', () => {
			test('rollbar.log is NOT called', () => {
				const rollbar = MockRollbar();
				const error = null;
				rollbarErrorHandler(error, rollbar);

				expect(rollbar.log.called).not.to.be.true();
			});
		});

		suite('And `rollbarError`', () => {
			test('rollbar.log is called', () => {
				const rollbar = MockRollbar();
				const error = 'Oops';
				rollbarErrorHandler(error, rollbar);

				expect(rollbar.log.called).to.be.true();
			});

			test('rollbar.log called correctly', () => {
				const rollbar = MockRollbar();
				const error = 'Oops';
				rollbarErrorHandler(error, rollbar);

				const [result] = rollbar.log.args[0];

				expect(result).to.contain(
					`Error reporting to rollbar, ignoring: ${error}`,
				);
			});
		});
	});

	suite('Given preResponse and rollbar', () => {
		suite('And `response.request.isBoom` is false', () => {
			test('rollbar.error is NOT called', () => {
				const rollbar = MockRollbar();
				const { request, h } = MockParams();

				preResponse({ request, h, rollbar });

				expect(rollbar.error.called).not.to.be.true();
			});
		});

		suite('And `response.request.isBoom` is true', () => {
			test('rollbar.error is called', () => {
				const rollbar = MockRollbar();
				const { request, h } = MockParams();
				request.response.isBoom = true;

				preResponse({ request, h, rollbar });

				expect(rollbar.error.called).to.be.true();
			});
		});
	});
});
