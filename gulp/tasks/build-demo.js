var gulp = require('gulp'),
    config = require('../config');

module.exports = function() {
    return gulp
        .src('demo/src/js/*.js')
        .pipe(gulp.dest('demo/dist/js'));
};