var gulp = require('gulp'),
	config = require('../config');

module.exports = function() {
	gulp.watch(config.paths.scripts, ['copy']);
};
