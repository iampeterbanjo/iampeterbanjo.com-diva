import Hapi from '@hapi/hapi';
import Lab from '@hapi/lab';
import { expect } from '@hapi/code';
import sinon from 'sinon';

import utils from '../../utils';
import routes from '../../blog/routes';
import plugin from '../../blog/plugin';

const { message } = utils;
export const lab = Lab.script();
const { suite, test, beforeEach } = lab;



suite('getBlogFiles', () => {
	let server;

	beforeEach(() => {
		server = Hapi.Server();
	});

	test('get posts route gets markdown files', async () => {
		const files = ['that.md', 'this.md'];
		const getBlogFiles = sinon.stub().resolves(files);
		const stubMethods = [{ name: 'blog.getBlogFiles', method: getBlogFiles }];

		await server.register({
			plugin,
			options: { methods: stubMethods },
		});

		const { method, url } = routes.v1.get_blog_posts();
		const { result } = await server.inject({
			method,
			url,
		});

		expect(result).to.equal(files);
	});
});

suite('getBlogContents', () => {
	let server;

	beforeEach(() => {
		server = Hapi.Server();
	});

	test('post details returns 404 for unknown file', async () => {
		const getBlogContents = sinon.stub().resolves('');
		const stubMethods = [
			{ name: 'blog.getBlogContents', method: getBlogContents },
		];

		await server.register({
			plugin,
			options: { methods: stubMethods },
		});

		const filename = 'the-GVDuMVROxCVNpgWy-file';
		const { method, url } = routes.v1.get_blog_details(filename);
		const result = await server.inject({
			method,
			url,
		});

		expect(result).to.contain({
			statusCode: 404,
			result: message.ERROR_POST_NOT_FOUND,
		});
	});

	test('post details gets expected markdown file', async () => {
		const filename = 'the-ok-gatsby';
		const contents = 'its a wonderful world';
		const getBlogContents = sinon.stub().resolves(contents);
		const stubMethods = [
			{ name: 'blog.getBlogContents', method: getBlogContents },
		];

		await server.register({
			plugin,
			options: { methods: stubMethods },
		});
		const { method, url } = routes.v1.get_blog_details(filename);
		const { result } = await server.inject({
			method,
			url,
		});

		expect(result).to.contain(contents);
	});
});
