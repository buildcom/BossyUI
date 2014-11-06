var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	config = require('../config');

module.exports = function() {

	return gulp
		.src(config.paths.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
};