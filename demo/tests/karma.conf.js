// Karma configuration
// Generated on Wed Sep 10 2014 20:43:21 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        "../public/bower_components/angular/angular.min.js",
        "../public/bower_components/angular/angular.js",
        "../public/bower_components/angular-mocks/angular-mocks.js",
        "../public/javascripts/bossy.all.js",
        "../public/javascripts/demo.js",
        "../../src/directives/templates/*.html",
        "jasmine/spec/titlespec.js"

    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        "../../src/directives/templates/*.html": ["ng-html2js"]
    },

    ngHtml2JsPreprocessor: {
    // If your build process changes the path to your templates,
    // use stripPrefix and prependPrefix to adjust it.
    stripPrefix: "../../../src/directives/templates/.*",
    prependPrefix: "",

    // the name of the Angular module to create
    moduleName: "my.templates"
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


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
