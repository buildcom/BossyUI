var gulp = require('gulp');

module.exports = function() {
    return gulp
        .start('build-src', 'build-demo', 'build-install');
};