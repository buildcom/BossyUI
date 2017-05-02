const gulp = require('gulp-help')(require('gulp'));
const sequence = require('run-sequence');
const shell = require('gulp-shell');


gulp.task('copy-images', 'Copy images for release', function() {
	return gulp
		.src('src/images/**')
		.pipe(gulp.dest('sandbox/images'));
});

gulp.task('copy-templates', 'Copy templates for release', function() {
	return gulp
		.src('src/templates/**')
		.pipe(gulp.dest('sandbox/templates'));
});

gulp.task('copy-styles', 'Copy styles for release', function() {
	return gulp
		.src('src/styles/**')
		.pipe(gulp.dest('sandbox/styles'));
});

// gulp.task('build-doc', function () {;
// 	gulp.src([
// 		'./dist/components/**/*.js',
// 		'./dist/directives/**/*.js'
// 	], {read: false})
// 		.pipe(shell([
// 			//'echo <%= file.path.replace(file.cwd + "/dist/", file.cwd + "/dist/jsdoc/") %>'
// 			'node node_modules/jsdoc/jsdoc.js <%= file.path %> -c jsdoc.json > <%= file.path.replace(file.cwd + "/dist/", file.cwd + "/dist/jsdoc/") %>'
// 		]));
// });

gulp.task('site-install', 'Installs BossyUI Site', function(callback) {
	sequence(
		'copy-styles',
		'copy-templates',
		'copy-images',
		callback);
});