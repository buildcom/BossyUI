//TODO: create release task
var gulp = require('./gulp')([
    'jshint',
    'watch',
    'copy',
    'build',
    'compass',
    'test'
]);