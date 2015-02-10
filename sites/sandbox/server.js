var http = require('http'),
	fs = require('fs'),
	path = require('path');

http.createServer(function (req, res) {

	var file = req.url === '/' ? '/index.html' : req.url;
	var static = [
		'./sites/sandbox',
		'./src/directives',
		'./src/directives/templates',
		'./src',
		'./dist'
	];
	var fileExists = false;

	static.forEach(function(staticRoute) {
		if (fs.existsSync(staticRoute + file)) {
			file = staticRoute + file;
			fileExists = true;
		}
	});

	var extname = path.extname(file);
	var contentType = 'text/html';
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
	}

	if (fileExists) {
		fs.readFile(file, function(error, content) {
			if (error) {
				res.writeHead(500);
				res.end();
			}
			else {
				res.writeHead(200, {
					'Content-Type': contentType
				});
				res.end(content, 'utf-8');
			}
		});
	} else {
		res.writeHead(404);
		res.end();
	}


}).listen(3000, '127.0.0.1');
console.log('Server running at http://localhost:3000/');
