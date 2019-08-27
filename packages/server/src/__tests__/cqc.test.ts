import Hapi from '@hapi/hapi';
import { expect } from '@hapi/code';
import Lab from '@hapi/lab';
import sinon from 'sinon';
import Wreck from '@hapi/wreck';
import plugin from '../cqc';

export const lab = Lab.script();
const { test, before, suite } = lab;

const server = Hapi.Server();

suite('cqc:', () => {
	before(async ({ context }) => {
		const client = Wreck.defaults({ baseUrl: '/' });
		context.response = { body: 'Done' };
		sinon.stub(client, 'get').resolves(context.response);

		server.register({
			plugin,
			options: { client },
		});
	});

	test('cqc providers request returns expected', async ({ context }) => {
		const { result } = await server.inject({
			method: 'GET',
			url: '/cqc/providers',
		});
		expect(result).to.equal(context.response.body);
	});
});
