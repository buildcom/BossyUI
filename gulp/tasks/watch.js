var gulp = require('gulp'),
	config = require('../config');

module.exports = function() {	
	gulp.watch(config.paths.scss, ['compass']);
	gulp.watch(config.paths.css, ['copy']);
	gulp.watch(config.paths.scripts, ['copy']);
	gulp.watch(config.paths.scripts, ['build']);
};