const dust = require('dustjs-linkedin');
const cons = require('consolidate');
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const livereload = require('express-livereload');
const express = require('express');
const app = express();

livereload(app, config={
    watchDir: process.cwd() + '/dist'
});
app.engine('dust', cons.dust);

app.set('views', __dirname + '/views');
app.set('view engine', 'dust');

app.use('/node_modules', express.static('node_modules', { extensions: ['js'] }));
app.use('/dist', express.static('dist', { extensions: ['js'] }));
app.use('/bootstrap', express.static('site/bootstrap'));
app.use('/app', express.static('site/app'));
app.use('/templates', express.static('site/templates'));
app.use('/css', express.static('site/css'));
app.use('/images', express.static('site/images'));

app.get('/', function (req, res) {
	res.render('index', {
		components: getComponents(),
		isDevel: process.env.NODE_ENV != 'production'
	});
});

const server = app.listen(process.env.PORT || 3000, function () {
    const port = server.address().port;

	const asciiLogo = '' +
		'╔╗ ┌─┐┌─┐┌─┐┬ ┬╦ ╦╦\n' +
		'╠╩╗│ │└─┐└─┐└┬┘║ ║║\n' +
		'╚═╝└─┘└─┘└─┘ ┴ ╚═╝╩\n';

    console.log('\n%s\nBossyUI Preview running at http://localhost:%s\n', asciiLogo, port);
});

function getComponents() {
	const components = [];

	glob.sync('dist/components/**/*.js').forEach(function(file) {
		const name = path.basename(file).split('.')[0],
			shortName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`,
			fullName = `Bossy${shortName}`;

		components.push({fullName: fullName, shortName: shortName, path: file});
	});

	return components;
}