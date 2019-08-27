import Lab from '@hapi/lab';
import { expect } from '@hapi/code';
import routes from '../../blog/routes';

export const lab = Lab.script();
const { test, suite } = lab;

suite('blog api', () => {
	test('blog posts route has expected method, path, url', () => {
		const { method, path, url } = routes.v1.get_blog_posts();

		expect(method).to.equal('GET');
		expect(path).to.equal('/v1/blog/posts');
		expect(url).to.equal('/v1/blog/posts');
	});

	test('blog post details route has correct method, path, url', () => {
		const post = 'get-a-blog-post';
		const { method, path, url } = routes.v1.get_blog_details(post);

		expect(method).to.equal('GET');
		expect(path).to.equal('/v1/blog/posts/{post}');
		expect(url).to.equal(`/v1/blog/posts/${post}`);
	});

	test('blog post details has correct url without filename', () => {
		const { url } = routes.v1.get_blog_details();

		expect(url).to.equal('/v1/blog/posts/');
	});
});
