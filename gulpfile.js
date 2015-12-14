var gulp = require('gulp-help')(require('gulp')),
	fs = require('fs'),
	shell = require('gulp-shell'),
	jshint = require('gulp-jshint'),
	install = require('gulp-install'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	sequence = require('run-sequence'),
	karma = require('karma').server,
	sass = require('gulp-sass'),
	util = require('gulp-util'),
	nodemon = require('gulp-nodemon'),
	bump = require('gulp-bump'),
	gulpJsdoc2md = require('gulp-jsdoc-to-markdown'),
	config = require('./gulp_config.json'),
	g = require('gulp-load-plugins')({lazy: false}),
	livereload = require('gulp-livereload'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	args = require('minimist')(process.argv.slice(2)),
	isWatching = false;

gulp.task('site', 'Runs BossyUI Site', function(callback) {

	sequence(
		'site-libs',
        'build-sass',
		'build-js',
        'watch',
		'site-serve',
		'copy-images',
		callback);
});

gulp.task('site-install', 'Installs BossyUI Site', function(callback) {

	sequence(
		'site-libs',
		'build-sass',
		'build-js',
		'copy-images',
		callback);
});

gulp.task('site-libs', false, function() {

	return gulp
		.src('site/bower.json')
		.pipe(install());
});

gulp.task('site-serve', false, shell.task([
    'nodemon site/server.js'
]));

gulp.task('build-js', 'Runs build for all lib Javascript', function() {
	return gulp
		.src('src/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('bossy.all.js'))
		.pipe(uglify({ mangle: false }))
		.pipe(sourcemaps.write('../maps'))
		.pipe(gulp.dest(config.paths.js.dist));
});

gulp.task('copy-images', 'Copy images for release', function() {
	return gulp
		.src('src/images/**')
		.pipe(gulp.dest('dist/images'));
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
		.pipe(sourcemaps.init())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(sass({
			outputStyle: 'compressed',
			errLogToConsole: true
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.paths.css.dist));
});

gulp.task('build-docs', function(){
	//var template = require('./docs/templates/template.hbs');

	return gulp.src('src/directives/bossy.chart.js')
		.pipe(gulpJsdoc2md({ template: fs.readFileSync('./docs/templates/directive.hbs', 'utf8') }))
		.on('error', function(err){
			util.log(util.colors.red('jsdoc2md failed'), err.message);
		})
		.pipe(rename(function(path){
			path.extname = '.md';
		}))
		.pipe(gulp.dest('dist/docs'));
});

gulp.task('run-tests', 'Runs all Karma tests', function() {

	karma.start({
		configFile: __dirname + '/test/karma.conf.js'
	});
	gulp.watch(config.paths.js.src, ['build-js']);

	return gulp.src('')
		.pipe(shell([
			'node site/server.js'
		]));
});

gulp.task('jshint', 'Runs JSHint on JS lib', function() {

	return gulp
		.src(config.paths.js.src)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('watch', 'Watcher task', function() {
    gulp.watch('src/**/*.scss', ['build-sass']);
    gulp.watch('src/**/*.js', ['build-js']);
});

gulp.task('install', 'Runs npm and bower installs', function() {
	return gulp
		.src(['./bower.json', './package.json'])
		.pipe(install());
});

gulp.task('release', ['run-tests', 'build-sass', 'build-js', 'copy-templates'], function() {
	gulp
		.src(['./bower.json', './package.json'])
		.pipe(bump({
			type: args.major ? 'major' : args.minor ? 'minor' : 'patch'
		}))
		.pipe(gulp.dest('./'));
});
