var gulp = require('gulp-help')(require('gulp')),
	sequence = require('run-sequence');


gulp.task('copy-images', 'Copy images for release', function() {
	return gulp
		.src('src/images/**')
		.pipe(gulp.dest('dist/images'));
});

gulp.task('copy-templates', 'Copy templates for release', function() {
	return gulp
		.src('src/templates/**')
		.pipe(gulp.dest('dist/templates'));
});

gulp.task('copy-styles', 'Copy styles for release', function() {
	return gulp
		.src('src/styles/**')
		.pipe(gulp.dest('dist/styles'));
});

gulp.task('site-install', 'Installs BossyUI Site', function(callback) {
	sequence(
		'copy-styles',
		'copy-templates',
		'copy-images',
		callback);
});