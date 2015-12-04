var dust = require('dustjs-linkedin');
var cons = require('consolidate');
var path = require('path');
var glob = require('glob');
var livereload = require('express-livereload');
var express = require('express');
var app = express();

livereload(app, config={
    watchDir: process.cwd() + '/dist'
});
app.engine('dust', cons.dust);

app.set('views', __dirname + '/views');
app.set('view engine', 'dust');

app.use('/dist/js', express.static('dist/js'));
app.use('/dist/css', express.static('dist/css'));
app.use('/dist/images', express.static('dist/images'));
app.use('/lib', express.static('site/lib'));
app.use('/js', express.static('site/js'));
app.use('/css', express.static('site/css'));
app.use('/images', express.static('site/images'));
app.use('/templates', express.static('site/templates'));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/directives', function (req, res) {
	var directives = getDirectives();

    res.render('directives', {directives: directives});
});

app.get('/styles', function (req, res) {
    res.render('styles');
});

app.get('/sandbox', function (req, res) {
	var directives = getDirectives();

	res.render('sandbox', {directives: directives});
});

var server = app.listen(3000, function () {
    var port = server.address().port;

	var asciiLogo = '' +
		'╔╗ ┌─┐┌─┐┌─┐┬ ┬╦ ╦╦\n' +
		'╠╩╗│ │└─┐└─┐└┬┘║ ║║\n' +
		'╚═╝└─┘└─┘└─┘ ┴ ╚═╝╩\n';

    console.log('\n%s\nBossyUI Preview running at http://localhost:%s\n', asciiLogo, port);
});

function getDirectives() {
	var directives = [];

	glob.sync('src/directives/*.js').forEach(function(file) {
		directives.push({directive: path.basename(file).split('.')[1]});
	});

	return directives;
}