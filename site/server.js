var dust = require('dustjs-linkedin');
var cons = require('consolidate');
var path = require('path');
var glob = require('glob');
var fs = require('fs');
var livereload = require('express-livereload');
var express = require('express');
var app = express();

livereload(app, config={
    watchDir: process.cwd() + '/dist'
});
app.engine('dust', cons.dust);

app.set('views', __dirname + '/views');
app.set('view engine', 'dust');

app.use('/node_modules', express.static('node_modules', { extensions: ['js'] }));
app.use('/dist', express.static('dist', { extensions: ['js'] }));
app.use('/bootstrap', express.static('site/bootstrap'));
app.use('/app', express.static('site/js'));
app.use('/css', express.static('site/css'));
app.use('/fonts', express.static('site/fonts'));
app.use('/images', express.static('site/images'));

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

	glob.sync('dist/components/**/*.js').forEach(function(file) {
		var name = path.basename(file).split('.')[0],
		shortName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`,
		fullName = `Bossy${shortName}`;
		components.push({fullName: fullName, shortName: shortName, path: file});
	});

	return components;
}
