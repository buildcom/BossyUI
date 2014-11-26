var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	config = require('../config');

module.exports = function() {
	gulp.watch(config.paths.scss, ['compass']);
	gulp.watch(config.paths.css, ['copy']);
	gulp.watch(config.paths.scripts, ['copy', 'build', 'jshint']);
};