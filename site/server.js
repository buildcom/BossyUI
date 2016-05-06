var dust = require('dustjs-linkedin');
var cons = require('consolidate');
var path = require('path');
var glob = require('glob');
var parse = require('jsdoc-parse');
var fs = require('fs');
var livereload = require('express-livereload');
var express = require('express');
var app = express();

livereload(app, config={
    watchDir: process.cwd() + '/node_modules/bossyui'
});
app.engine('dust', cons.dust);

app.set('views', __dirname + '/views');
app.set('view engine', 'dust');

app.use('/bootstrap', express.static('bootstrap'));
app.use('/node_modules', express.static('node_modules', { extensions: ['js'] }));
app.use('/app', express.static('js'));
app.use('/css', express.static('css'));
app.use('/images', express.static('images'));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/sandbox', function (req, res) {
	res.render('sandbox', {
		components: getComponents(),
		isDevel: process.env.NODE_ENV != 'production'
	});
});

var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;

	var asciiLogo = '' +
		'╔╗ ┌─┐┌─┐┌─┐┬ ┬╦ ╦╦\n' +
		'╠╩╗│ │└─┐└─┐└┬┘║ ║║\n' +
		'╚═╝└─┘└─┘└─┘ ┴ ╚═╝╩\n';

    console.log('\n%s\nBossyUI Preview running at http://localhost:%s\n', asciiLogo, port);
});

function getComponents() {
	var components = [];

	glob.sync('node_modules/bossyui/dist/components/**/*.js').forEach(function(file) {
		var name = path.basename(file).split('.')[0],
		shortName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`,
		fullName = `Bossy${shortName}`;
		components.push({fullName: fullName, shortName: shortName, path: file});
	});

	return components;
}