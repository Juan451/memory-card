module.exports = {
	globDirectory: 'src/',
	globPatterns: [
		'**/*.js'
	],
	swDest: 'src/service-worker.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};