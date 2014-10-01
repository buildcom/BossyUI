//TODO: create release task
var gulp = require('./gulp')([
    'jshint',
    'watch',
    'copy',
    'build',
    'build-demo',
    'compass',
    'test'
]);