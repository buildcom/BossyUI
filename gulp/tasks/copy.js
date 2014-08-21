var gulp = require('gulp'),
	config = require('../config');

module.exports = function() {

	return gulp
		.src(config.paths.scripts.concat(config.paths.css))
		.pipe(gulp.dest('demo/bossy'));
};