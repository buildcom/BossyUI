var gulp = require('gulp-help')(require('gulp')),
	shell = require('gulp-shell'),
	jshint = require('gulp-jshint'),
	install = require('gulp-install'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	sequence = require('run-sequence'),
	karma = require('karma').server,
	compass = require('gulp-compass'),
	nodemon = require('gulp-nodemon'),
	bump = require('gulp-bump'),
	config = require('./gulp_config.json'),
	args = require('minimist')(process.argv.slice(2));

gulp.task('build-sandbox', 'Runs build and adds BossyUI libs to Sandbox', function(callback) {

	sequence(
		'sandbox-install',
		'build-js',
		'build-sass',
		'sandbox-copy-css',
		callback);
});

gulp.task('sandbox-install', false, function() {

	return gulp
		.src('sites/sandbox/bower.json')
		.pipe(install());
});

gulp.task('sandbox-copy-css', false, function() {

	return gulp
		.src(['dist/css/bossy.css'])
		.pipe(gulp.dest('sites/sandbox/css'));
});

gulp.task('build-js', 'Runs build for all lib Javascript', function() {

	return gulp
		.src(config.paths.js.src)
		.pipe(sourcemaps.init())
		.pipe(concat('bossy.all.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.paths.js.dist));
});

gulp.task('copy-templates', 'Copy templates for release', function() {
	return gulp
		.src('src/directives/templates/**', {
			base: 'src/directives'
		})
		.pipe(gulp.dest('dist/js'));
});

gulp.task('build-sass', 'Runs build for all lib Sass/Css', function() {

	return gulp
		.src(config.paths.scss.src)
		.pipe(compass({
			style: 'compressed',
			sass: 'src/scss',
			css: config.paths.css.dist
		}));
});

gulp.task('run-tests', 'Runs all Karma tests', function() {

	karma.start({
		configFile: __dirname + '/test/karma.conf.js'
	});
});

gulp.task('serve', 'Runs development environment server', ['build-sandbox'], function() {
	gulp.watch(config.paths.scss.src, ['build-sass', 'sandbox-copy-css']);

	return gulp.src('')
		.pipe(shell([
			'node sites/sandbox/server.js'
		]));
});

gulp.task('jshint', 'Runs JSHint on JS lib', function() {

	return gulp
		.src(config.paths.js.src)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('watch', 'Watcher task', function() {
	gulp.watch(config.paths.scss.src, ['build-sass']);
	gulp.watch(config.paths.js.src, ['build-js']);
});

gulp.task('install', 'Runs npm and bower installs', function() {
	return gulp
		.src(['./bower.json', './package.json'])
		.pipe(install());
});

gulp.task('release', ['build-sass', 'build-js'], function() {
	gulp
		.src(['./bower.json', './package.json'])
		.pipe(bump({
			type: args.major ? 'major' : args.minor ? 'minor' : 'patch'
		}))
		.pipe(gulp.dest('./'));
});
