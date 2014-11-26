var gulp = require('gulp'),
    install = require("gulp-install");

module.exports = function() {
    return gulp
        .src(['./bower.json', './package.json'])
        .pipe(install());
};