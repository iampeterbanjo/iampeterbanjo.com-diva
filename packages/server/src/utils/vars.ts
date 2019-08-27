export const baseUrl = 'http://0.0.0.0:8080';
export const lyricsIdPath = 'response.hits[0].result.id';
export const songInfoPath = `response.hits[0].result.{
	"id": id,
	"thumbnail": song_art_image_thumbnail_url
}`;
export const topTracksPath = `tracks.track.{
	"title": name,
		"image": image[3]."#text",
		"artist": artist.name,
		"url": artist.url,
		"profileUrl": $getProfileUrl(artist.name, name)
}`;
export const GENIUS_API_ACCESS_TOKEN = process.env.GENIUS_API_ACCESS_TOKEN;
export const GENIUS_API_URL = process.env.GENIUS_API_URL;
export const LASTFM_API_URL = process.env.LASTFM_API_URL;
export const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
export const PORT = process.env.PORT;
export const MONGODB_ADDON_URI = process.env.MONGODB_ADDON_URI;
export const MONGODB_ADDON_DB = process.env.MONGODB_ADDON_DB;
export const WATSON_PI_API_KEY = process.env.WATSON_PI_API_KEY;
export const WATSON_PI_API_URL = process.env.WATSON_PI_API_URL;
export const WATSON_PI_API_VERSION = process.env.WATSON_PI_API_VERSION;
export const ENVIRONMENT = process.env.NODE_ENV || 'development';
export const BASE_URL = process.env.BASE_URL;
export const SENTRY_DSN = process.env.SENTRY_DSN;
export const ROLLBAR_ACCESS_TOKEN = process.env.ROLLBAR_ACCESS_TOKEN;
export const PACKAGE_VERSION = process.env.npm_package_version;
