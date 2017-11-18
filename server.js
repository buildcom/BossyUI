const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json({
  type: ['application/json', 'json', 'application/csp-report']
}));

app.use(express.static(path.join(__dirname, './dist')));

// get hydrates the values on the form elements
app.get('/api/test', (req, res) => {
  const data = {
    textInput: {
      value: 'This is my input'
    },
    textareaInput: {
      value: `
          This is a very long area
          that folds like this
          and stuff
      `
    },
    emailInput: {
      value: 'test@test.com'
    }
  };
  res.json(data);
});
// Test for post validates an input called emailInput to be a valid input
app.post('/api/test', (req, res) => {
  const {emailInput} = req.body;
  // ensures that email has an @ sign
  if (emailInput && emailInput.match(/(.)*@(.)*/)) {
    // valid email
    res.json({});
  } else {
    // not valid sould display error
    res.json({
      errors: {
        emailInput: {
          message: 'email should have an @ symbol'
        }
      }
    });
  }
});

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
