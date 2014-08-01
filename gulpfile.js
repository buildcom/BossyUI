var gulp = require('gulp');

var paths = {
	scripts: ['src/**/*.js']
};

gulp.task('scripts', function() {
	return gulp
		.src(paths.scripts)
		.pipe(gulp.dest('demo/bossy'));
});

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['scripts']);
});