// Karma configuration
// Generated on Sun Sep 14 2014 10:15:49 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [

      'https://code.angularjs.org/1.3.11/angular.js',
      'https://code.angularjs.org/1.3.11/angular-mocks.js',
      './../src/*.js',
      './../src/directives/templates/*.html',
      './../src/directives/*.js',
      './../src/services/*.js',
      './directives/*.js',
      './controllers/*.js',
      './services/*.js'

    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        './../src/directives/templates/*.html':['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
    // stripPrefix:'./../src/directives/templates/*.html',
     moduleName: 'bossy-templates'

    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
      captureTimeout: 100000,

      // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
