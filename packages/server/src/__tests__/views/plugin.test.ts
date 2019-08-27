import Hapi from '@hapi/hapi';
import Lab from '@hapi/lab';
import { expect } from '@hapi/code';
import Vision from '@hapi/vision';
import sinon from 'sinon';
import cheerio from 'cheerio';

import plugin from '../../views/plugin';
import routes from '../../views/routes';
import * as data from '../../views/context';

export const lab = Lab.script();
const { suite, test, before } = lab;

const posts = [
	{
		title: 'this',
		url: '/this',
		description: 'this thing',
		date: '2019-12-01',
	},
	{
		title: 'that',
		url: '/that',
		description: 'that thing',
		date: '2019-11-01',
	},
];
const methods = [
	{
		name: 'view.blogContent',
		method: sinon.stub().resolves({ content: 42 }),
	},
	{
		name: 'view.blogList',
		method: sinon.stub().resolves(posts),
	},
];
const Server = async () => {
	const server = Hapi.Server();

	await server.register([
		Vision,
		{
			plugin,
			options: { methods },
		},
	]);

	return server;
};

suite('Given Berserker route', () => {
	suite('And server', () => {
		let server;

		before(async () => {
			server = await Server();
		});

		test('status is 200', async () => {
			const { method, url } = routes.get_berserker();
			const response = await server.inject({
				method,
				url,
			});

			expect(response.statusCode).to.equal(200);
		});
	});
});

suite('view blog', async () => {
	let server;

	before(async () => {
		server = await Server();
	});

	test('requesting blog posts gives 200 status', async () => {
		const { method, url } = routes.get_blog_posts();
		const response = await server.inject({
			method,
			url,
		});

		expect(response.statusCode).to.equal(200);
	});

	test('requesting blog posts gives 200 status', async () => {
		const { method, url } = routes.get_blog_details();
		const response = await server.inject({
			method,
			url,
		});

		expect(response.statusCode).to.equal(200);
	});

	test('requesting home page gives 200 status', async () => {
		const { method, url } = routes.get_home();
		const response = await server.inject({
			method,
			url,
		});

		expect(response.statusCode).to.equal(200);
	});
});

suite('SEO', () => {
	before(async ({ context }) => {
		const server = await Server();
		const { method, url } = routes.get_home();
		const { result } = await server.inject({
			method,
			url,
		});

		context.$ = cheerio.load(result);
		context.result = result;
	});

	test('HTML5 doctype', ({ context }) => {
		expect(context.result).to.startWith('<!DOCTYPE html>');
	});

	test('title tag', ({ context }) => {
		const result = context.$('title').text();
		expect(result).to.equal(data.title);
	});

	test('meta charset', ({ context }) => {
		const result = context.$('meta[charset="utf-8"]');
		expect(result).to.exist();
	});

	test('meta viewport', ({ context }) => {
		const result = context.$('meta[name="viewport"]').attr('content');
		expect(result).to.exist();
	});

	test('meta description', ({ context }) => {
		const result = context.$('meta[name="description"]').attr('content');
		expect(result).to.equal(data.description);
	});

	test('html language', ({ context }) => {
		const result = context.$('html').attr('lang');
		expect(result).to.equal('en');
	});

	test('css in head element', ({ context }) => {
		const result = context.$('head').has('[rel="stylesheet"]');
		expect(result.length).to.greaterThan(0);
	});

	test('favicon link', ({ context }) => {
		const result = context.$('[rel="icon"]').attr('href');
		expect(result).to.exist();
	});
});
