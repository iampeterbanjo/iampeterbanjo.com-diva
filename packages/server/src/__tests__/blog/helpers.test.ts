import Lab from '@hapi/lab';
import { expect } from '@hapi/code';
import fecha from 'fecha';
import { getUrlPath, getBlogFiles, getBlogContents } from '../../blog/helpers';

export const lab = Lab.script();

const { suite, test, before } = lab;

suite('getUrlPath', () => {
	const filePath =
		'/home/iampeterbanjo/clever-cloud/iampeterbanjo.com/packages/blog/posts/graphql-eats-rest.md';

	test('url does not contain md', () => {
		const urlPath = getUrlPath(filePath);

		expect(urlPath).not.to.endWith('.md');
	});

	test('url does not contain packages/', () => {
		const urlPath = getUrlPath(filePath);

		expect(urlPath).not.contain('packages/');
		expect(urlPath).not.contain(
			'/home/iampeterbanjo/clever-cloud/iampeterbanjo.com',
		);
	});

	test('url should contain "/blog/posts"', () => {
		const urlPath = getUrlPath(filePath);

		expect(urlPath).to.startWith('/blog/posts');
	});
});

suite('getBlogFiles', () => {
	before(async ({ context }) => {
		context.results = await getBlogFiles();
	});

	test('that it returns list of relative paths', ({ context }) => {
		expect(context.results.length).to.be.above(0);
	});

	test('blog frontmatter is in result', ({ context }) => {
		context.results.forEach(result => {
			const { description, title, url, date } = result;

			expect(url).to.exist();
			expect(title, `given ${url}`).to.exist();
			expect(description, `given ${title}`).to.exist();
			expect(date, `given ${title}`).to.exist();
		});
	});
});

suite('getBlogContents', () => {
	['', 'the-GVDuMVROxCVNpgWy-file'].forEach(post => {
		test(`when empty ${post}, content is also empty`, async () => {
			const result = await getBlogContents(post);

			expect(result, `given ${post}`).to.not.exist();
		});
	});

	['graphql-eats-rest', 'i-like-jsonata'].forEach(post => {
		test(`when ${post} is NOT empty, the content is found`, async () => {
			const result = await getBlogContents(post);
			if (!result) return;
			const { title, content, date } = result;
			const details = `given ${title}`;
			const validDate = fecha.format(new Date(date), 'mediumDate');

			expect(date, details).to.exist();
			expect(date, details).to.equal(validDate);
			expect(content, details).to.exist();
		});
	});

	test('markdown content is parsed', async () => {
		const result = await getBlogContents('i-like-jsonata');
		if (!result) return;
		const { content } = result;
		const isHTML = content.indexOf('</p>') > -1;

		expect(isHTML).to.be.true();
	});
});
