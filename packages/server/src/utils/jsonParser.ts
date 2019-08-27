import jsonata from 'jsonata';

export const evaluate = (data: Object, path: string) => {
	const expression = jsonata(path);
	return expression.evaluate(data);
};
