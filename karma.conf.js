module.exports = function (config) {
	config.set({

		basePath: '',

		frameworks: ['jasmine'],

		files: [
			// paths loaded by Karma
			{ pattern: 'node_modules/angular2/bundles/angular2-polyfills.js', included: true, watched: true },
			{ pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: true },
			{ pattern: 'node_modules/rxjs/bundles/rx.js', included: true, watched: true },
			{ pattern: 'node_modules/angular2/bundles/angular2.js', included: true, watched: true },
			{ pattern: 'node_modules/angular2/bundles/testing.dev.js', included: true, watched: true },
			{ pattern: 'karma-test-shim.js', included: true, watched: true },

			// paths loaded via module imports
			{ pattern: 'dist/**/*.js', included: false, watched: true },

			// paths to support debugging with source maps in dev tools
			{ pattern: 'src/**/*.ts', included: false, watched: false },
			{ pattern: 'dist/**/*.js.map', included: false, watched: false }
		],

		// proxied base paths
		proxies: {
			//required for component assets fetched by Angular's compiler
			"/src/": "/base/src/"
		},

		reporters: ['progress'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['Chrome'],
		singleRun: false
	})
}