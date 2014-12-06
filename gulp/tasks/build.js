var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    config = require('../config');

module.exports = function() {
    return gulp
        .src(config.paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('bossy.all.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'))
        .pipe(gulp.dest('demo/public/javascripts'));
};