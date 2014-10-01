var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    config = require('../config');

module.exports = function() {
    return gulp
        .src('demo/src/js/*.js')
        .pipe(gulp.dest('demo/dist/js'));
};