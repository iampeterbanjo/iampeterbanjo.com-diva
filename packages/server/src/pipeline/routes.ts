const extract_top_tracks = () => ({
	method: 'GET',
	path: '/v1/pipeline/extract/topTracks',
	url: '/v1/pipeline/extract/topTracks',
});

const routes = {
	v1: {
		extract_top_tracks,
	},
};

export default routes;
