const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, './dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist/index.html'));
});


const server = app.listen(process.env.PORT || 3000, function () {
  const port = server.address().port;

  const asciiLogo = `
    ╔╗ ┌─┐┌─┐┌─┐┬ ┬╦ ╦╦
    ╠╩╗│ │└─┐└─┐└┬┘║ ║║
    ╚═╝└─┘└─┘└─┘ ┴ ╚═╝╩`;

  console.log('\n%s\nBossyUI Preview running at http://localhost:%s\n', asciiLogo, port);
});
