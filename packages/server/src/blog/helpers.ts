import Path from 'path';
import globby from 'globby';
import matter from 'gray-matter';
import marked from 'marked';
import fecha from 'fecha';

const dir = Path.join(__dirname, '../../../blog/posts');

export const getUrlPath = (filePath: string) => {
	const urlPath = [filePath]
		.map(f => f.replace('.md', ''))
		.map(f => {
			const start = f.indexOf('/blog/posts');
			return f.substr(start);
		});

	return urlPath[0];
};

export const getBlogFiles = async () => {
	const blogFiles = await globby(`${dir}/*.md`);
	const urlPaths = blogFiles.map(filePath => {
		const frontmatter = matter.read(filePath);
		const { data = {} } = frontmatter;

		return { ...data, url: getUrlPath(filePath) };
	});

	return urlPaths;
};

type Content = {
	title: string;
	content: string;
	date: string;
};

export const getBlogContents = async (
	filename: string,
): Promise<Content | null> => {
	const [blogFile] = await globby(`${dir}/${filename}.md`);

	if (!blogFile) return null;

	const { content, data = {} } = matter.read(blogFile);
	const { title, date } = data;
	const validDate = fecha.format(new Date(date), 'mediumDate');

	return { title, date: validDate, content: marked(content) };
};
