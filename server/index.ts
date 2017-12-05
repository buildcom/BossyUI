import * as path from 'path';
import * as fs from 'fs';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as validate from 'validate.js';

const app = express();

app.use(bodyParser.json({
  type: ['application/json', 'json', 'application/csp-report']
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// get all
app.get('/api/addresses', (req, res) => {
  fs.readFile(`${__dirname}/data/addresses.json`, 'utf8', (error, data) => {
    if (error) {
      return res.status(400).json({
        error: {
          status: 400,
          message: error.message,
        }
      });
    }

    const addresses = JSON.parse(data);

    return res.json({
      data: addresses,
    });
  });
});

// get single
app.get('/api/addresses/:addressId', (req, res) => {
  fs.readFile(`${__dirname}/data/addresses.json`, 'utf8', (error, data) => {
    if (error) {
      return res.status(400).json({
        error: {
          status: 400,
          message: error.message,
        }
      });
    }

    const addresses = JSON.parse(data);
    const { addressId } = req.params;

    if (addresses[addressId]) {
      return res.json({
        data: addresses[addressId],
      });
    }

    return res.status(404).json({
      error: {
        status: 404,
        message: 'address not found',
      }
    });
  });
});

// create
app.post('/api/addresses', (req, res) => {
  const { body } = req;
  const constraints = {
    firstName: { presence: true },
    lastName: { presence: true },
    address1: { presence: true },
    city: { presence: true },
    state: { presence: true },
    zipCode: { presence: true },
    email: { email: true, presence: true }
  };
  const validation = validate(body, constraints);

  if (validation) {
    return res.status(422).json({
      error: {
        status: 422,
        message: validation,
      }
    });
  }

  fs.readFile(`${__dirname}/data/addresses.json`, 'utf8', (error, data) => {
    if (error) {
      return res.status(400).json({
        error: {
          status: 400,
          message: error.message,
        }
      });
    }

    const addresses = JSON.parse(data);
    const keys = Object.keys(addresses).sort().reverse();
    const nextKey = keys.length > 0 ? parseInt(keys[0]) + 1 : 1;

    addresses[nextKey] = body;

    fs.writeFile(`${__dirname}/data/addresses.json`, JSON.stringify(addresses, null, 4), 'utf8', (error) => {
      if (error) {
        return res.status(400).json({
          error: {
            status: 400,
            message: error.message,
          }
        });
      }

      return res.json({
        data: {
          key: nextKey,
          ...addresses[nextKey],
        },
      });
    });
  });
});

// update
app.post('/api/addresses/:addressId', (req, res) => {
  const { body } = req;
  const constraints = {
    firstName: { presence: true },
    lastName: { presence: true },
    address1: { presence: true },
    city: { presence: true },
    state: { presence: true },
    zipCode: { presence: true },
    email: { email: true, presence: true }
  };
  const validation = validate(body, constraints);

  if (validation) {
    return res.status(422).json({
      error: {
        status: 422,
        message: validation,
      }
    });
  }

  fs.readFile(`${__dirname}/data/addresses.json`, 'utf8', (error, data) => {
    if (error) {
      return res.status(400).json({
        error: {
          status: 400,
          message: error.message,
        }
      });
    }

    const addresses = JSON.parse(data);
    const { addressId } = req.params;

    if (!addresses[addressId]) {
      return res.status(404).json({
        error: {
          status: 404,
          message: 'address not found',
        }
      });
    }

    addresses[addressId] = body;

    fs.writeFile(`${__dirname}/data/addresses.json`, JSON.stringify(addresses, null, 4), 'utf8', (error) => {
      if (error) {
        return res.status(400).json({
          error: {
            status: 400,
            message: error.message,
          }
        });
      }

      return res.json({
        data: {
          key: addressId,
          ...addresses[addressId],
        },
      });
    });
  });
});

app.use(express.static(path.join(__dirname, '../dist')));

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
