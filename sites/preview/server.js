var dust = require('dustjs-linkedin');
var cons = require('consolidate');
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
//app.use('/dist/directives/templates', express.static('dist/css'));
app.use('/lib', express.static('sites/preview/lib'));
app.use('/js', express.static('sites/preview/js'));
app.use('/css', express.static('sites/preview/css'));
app.use('/templates', express.static('sites/preview/templates'));
app.use('/bower_components', express.static('bower_components'));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/directives', function (req, res) {
    res.render('directives');
});

app.get('/styles', function (req, res) {
    res.render('styles');
});

var server = app.listen(3000, function () {
    var port = server.address().port;

    console.info('\n\n╔╗ ┌─┐┌─┐┌─┐┬ ┬╦ ╦╦\n╠╩╗│ │└─┐└─┐└┬┘║ ║║\n╚═╝└─┘└─┘└─┘ ┴ ╚═╝╩');
    console.log('\nBossyUI Preview running at http://localhost:%s\n\n', port);
});
