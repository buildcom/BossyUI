const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, './dist')));

app.get('/api/test', (req, res) => {
  const config = {
    elements: [
      {
        name: 'textInput',
        type: 'text',
        value: 'test value for text',
        label: {
          text: 'text label test',
          inline: true,
          'hasValidation': 'none'
        }
      },
      {
        name: 'textareaInput',
        type: 'textarea',
        value: 'test value for textarea',
        rows: 5,
        cols: 10
      },
      {
        name: 'emailInput',
        type: 'email',
        value: 'test value for email'
      },
      {
        name: 'selectmenu',
        type: 'selectmenu',
        selectmenu: {
          title: 'Vegetables',
          items: [
            {
              value: 'carrot'
            },
            {
              value: 'celery',
              isDisabled: true
            },
            {
              value: 'potato'
            }
          ]
        }
      },
      {
        name: 'radio',
        type: 'radio',
        label: {
          text: 'Test label for radio button'
        },
        radio: {
          componentId: 'myRadio',
          items: [
            {
              value: 'Option 1'
            },
            {
              value: 'Option 2'
            },
            {
              value: 'Option 3',
              isDisabled: true
            }
          ]
        }
      }
    ]
  };
  res.json(config);
});
app.post('api/test', (req, res) => {});
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
