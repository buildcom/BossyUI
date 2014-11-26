var gulp = require('gulp');
var karma = require('karma').server;

/**
 * Watch for file changes and re-run tests on each change
 */
 module.exports = function(){
   karma.start({
    configFile:__dirname +'./../../test/karma.conf.js'
  });

};