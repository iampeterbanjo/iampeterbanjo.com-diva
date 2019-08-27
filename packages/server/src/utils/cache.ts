import * as time from './time';

type Cache = {
	expiresIn?: number;
	staleIn?: number;
	generateTimeout?: any;
	staleTimeout?: number;
	cache?: string;
};
const cache: Cache = {
	expiresIn: time.oneDay,
	staleIn: time.tenSeconds,
	staleTimeout: time.oneHundredMilliseconds,
	generateTimeout: time.oneMinute,
	cache: 'mongodb-cache',
};

const getCache = (options?: Partial<Cache>) => {
	return Object.assign({}, cache, options);
};

export default getCache;
