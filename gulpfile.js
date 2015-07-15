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
	sourcemaps = require('gulp-sourcemaps'),
	nodemon = require('gulp-nodemon'),
	bump = require('gulp-bump'),
	gulpJsdoc2md = require('gulp-jsdoc-to-markdown'),
	config = require('./gulp_config.json'),
	g = require('gulp-load-plugins')({lazy: false}),
	lazypipe = require('lazypipe'),
	livereload = require('gulp-livereload'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	args = require('minimist')(process.argv.slice(2)),
	isWatching = false;

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
		.pipe(uglify({ mangle: false }))
		.pipe(gulp.dest(config.paths.js.dist))
		.pipe(gulp.dest(config.paths.js.sandbox))
		.pipe(livereload());
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
			outputStyle: 'compressed'
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.paths.css.dist))
		.pipe(gulp.dest(config.paths.css.sandbox))
		.pipe(livereload());
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
});
gulp.task('sandbox-copy-markdown', false, function() {
	return gulp
		.src([config.paths.markdown.src])
		.pipe(gulp.dest(config.paths.markdown.sandbox));
});

gulp.task('serve', 'Runs development environment server', ['build-sandbox'], function() {
	gulp.watch(config.paths.scss.src, ['build-sass', 'sandbox-copy-css']);
	gulp.watch(config.paths.markdown.src ['sandbox-copy-markdown']);

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
	isWatching = true;

	// Initiate livereload server:
	  livereload.listen();

	gulp.watch(config.paths.scss.src, ['build-sass']);
	gulp.watch(config.paths.js.src, ['build-js']);
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
