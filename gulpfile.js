//TODO: create release task
var gulp = require('./gulp')([
    'jshint',
    'watch',
    'copy',
    'compass',
    'test',
    'build',
    'build-src',
    'build-demo'
]);