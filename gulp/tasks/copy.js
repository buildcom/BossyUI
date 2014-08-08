var gulp = require('gulp'),
	config = require('../config');

module.exports = function() {
	return gulp
		.src(config.paths.scripts)
		.pipe(gulp.dest('demo/bossy'));
};