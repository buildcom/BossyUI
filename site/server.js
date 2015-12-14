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
    watchDir: process.cwd() + '/dist'
});
app.engine('dust', cons.dust);

app.set('views', __dirname + '/views');
app.set('view engine', 'dust');

app.use('/dist/js', express.static('dist/js'));
app.use('/dist/css', express.static('dist/css'));
app.use('/dist/images', express.static('dist/images'));
app.use('/lib/bootstrap', express.static('site/bootstrap'));
app.use('/lib', express.static('site/lib'));
app.use('/js', express.static('site/js'));
app.use('/css', express.static('site/css'));
app.use('/images', express.static('site/images'));
app.use('/templates', express.static('src/documentation'));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/documentation', function (req, res) {
	var directives = getDirectives();

	res.render('documentation', {directives: directives});
});

app.get('/sandbox', function (req, res) {
	var directives = getDirectives();

	res.render('sandbox', {directives: directives});
});

app.get('/api/directives/:name/doc', function (req, res) {
	var filename = process.cwd() + '/src/directives/bossy.' + req.params.name + '.js';
	var streamBuffer = '';
	var readStream = parse({ src: filename });

	readStream.on('readable', function() {
		readStream.read();
	});

	readStream.on('data', function (chunk) {
		streamBuffer += chunk;
	});

	readStream.on('end', function() {
		var docs = JSON.parse(streamBuffer);
		var params = [];
		var markup = '<bossy-' + req.params.name ;

		if (docs && docs[0] && docs[0].params) {

			docs[0].params.forEach(function (param) {
				var base = '';

				if (param.description) {
					base += '// ' + param.description + '\n';
				}

				base += '$scope.' + param.name + ' = ';

				if (param.defaultvalue) {
					base += param.defaultvalue + ';';
				} else {
					switch (param.type.names[0].toLowerCase()) {
						case 'param':
							markup += ' ' + param.name + '="' + param.name + '"';
						case 'object':
							base += '{};';
							break;

						case 'array':
							base += '[];';
							break;

						case 'number':
							base += '0;';
							break;

						case 'boolean':
							base += 'false;';
							break;

						default:
							base += '\'\';';
					}
				}

				params.push(base);
			});
		} else {
			params.push('// ERROR: no parameters where documented for this directive');
		}

		markup += '></bossy-' + req.params.name + '>';

		res.send({ params: params, markup: markup });
	});

	readStream.on('error', function(err) {
		res.send({ error: err });
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

function getDirectives() {
	var directives = [];

	glob.sync('src/directives/*.js').forEach(function(file) {
		directives.push({directive: path.basename(file).split('.')[1]});
	});

	return directives;
}