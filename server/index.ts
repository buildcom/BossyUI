const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json({
  type: ['application/json', 'json', 'application/csp-report']
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// get hydrates the values on the form elements
app.get('/api/test', (req, res) => {
  const data = {
    textInput: {
      value: 'This is my input'
    }
  };
  res.json(data);
});
// Test for post validates an input called emailInput to be a valid input
app.post('/api/test', (req, res) => {
  const {textInput} = req.body;
  // ensures that email has an @ sign
  if (textInput) {
    // valid email
    res.json({});
  } else {
    // not valid sould display error
    res.json({
      errors: {
        textInput: {
          message: 'invalid post'
        }
      }
    });
  }
});

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