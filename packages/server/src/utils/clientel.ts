import Lyricist from 'lyricist';
import Wreck from '@hapi/wreck';
import * as time from './time';
import * as vars from './vars';

const {
	baseUrl,
	GENIUS_API_ACCESS_TOKEN,
	GENIUS_API_URL,
	LASTFM_API_URL,
} = vars;

export const wreck = Wreck.defaults({ timeout: time.oneMinute });
export const api = wreck.defaults({ baseUrl });

export const genius = wreck.defaults({
	baseUrl: `${GENIUS_API_URL}/`,
	headers: {
		authorization: `Bearer ${GENIUS_API_ACCESS_TOKEN}`,
	},
	json: true,
});

export const lastfm = wreck.defaults({
	baseUrl: `${LASTFM_API_URL}/`,
	json: true,
});

export const lyricist = new Lyricist(GENIUS_API_ACCESS_TOKEN);
