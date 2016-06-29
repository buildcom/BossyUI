// Tun on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;


jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// // Cancel Karma's synchronous start,
// // we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function () { };


System.config({
	packages: {
		'base/dist': {
			defaultExtension: 'js',
			map: Object.keys(window.__karma__.files).
			filter(filterSourceFiles).
			reduce(function createPathRecords(pathsMapping, appPath) {
				// creates local module name mapping to global path with karma's fingerprint in path, e.g.:
				var moduleName = appPath.replace(/^\/base\/dist\//, './').replace(/\.js$/, '');
				pathsMapping[moduleName] = appPath + '?' + window.__karma__.files[appPath];
				return pathsMapping;
			}, {})

		}
	}
});

System.import('angular2/src/platform/browser/browser_adapter').then(function (browser_adapter) {
	browser_adapter.BrowserDomAdapter.makeCurrent();
}).then(function () {
	return Promise.all(loadTestFiles());
}).then(function () {
		__karma__.start();
	}, function (error) {
		__karma__.error(error.stack || error);
	});

function filterSourceFiles(path) {
	return /^\/base\/dist\/.*\.js$/.test(path)
}

function filterTestFiles(path) {
	return /\.spec\.js$/.test(path);
}

function importTestFiles(path) {
	return System.import(path);
}

function loadTestFiles() {
	return Object.keys(window.__karma__.files)
		.filter(filterTestFiles)
		.map(importTestFiles);
}