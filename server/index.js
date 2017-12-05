"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var express = require("express");
var bodyParser = require("body-parser");
var validate = require("validate.js");
var app = express();
app.use(bodyParser.json({
    type: ['application/json', 'json', 'application/csp-report']
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// get all
app.get('/api/addresses', function (req, res) {
    fs.readFile(__dirname + "/data/addresses.json", 'utf8', function (error, data) {
        if (error) {
            return res.status(400).json({
                error: {
                    status: 400,
                    message: error.message,
                }
            });
        }
        var addresses = JSON.parse(data);
        return res.json({
            data: addresses,
        });
    });
});
// get single
app.get('/api/addresses/:addressId', function (req, res) {
    fs.readFile(__dirname + "/data/addresses.json", 'utf8', function (error, data) {
        if (error) {
            return res.status(400).json({
                error: {
                    status: 400,
                    message: error.message,
                }
            });
        }
        var addresses = JSON.parse(data);
        var addressId = req.params.addressId;
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
app.post('/api/addresses', function (req, res) {
    var body = req.body;
    var constraints = {
        firstName: { presence: true },
        lastName: { presence: true },
        address1: { presence: true },
        city: { presence: true },
        state: { presence: true },
        zipCode: { presence: true },
        email: { email: true, presence: true }
    };
    var validation = validate(body, constraints);
    if (validation) {
        return res.status(422).json({
            error: {
                status: 422,
                message: validation,
            }
        });
    }
    fs.readFile(__dirname + "/data/addresses.json", 'utf8', function (error, data) {
        if (error) {
            return res.status(400).json({
                error: {
                    status: 400,
                    message: error.message,
                }
            });
        }
        var addresses = JSON.parse(data);
        var keys = Object.keys(addresses).sort().reverse();
        var nextKey = keys.length > 0 ? parseInt(keys[0]) + 1 : 1;
        addresses[nextKey] = body;
        fs.writeFile(__dirname + "/data/addresses.json", JSON.stringify(addresses, null, 4), 'utf8', function (error) {
            if (error) {
                return res.status(400).json({
                    error: {
                        status: 400,
                        message: error.message,
                    }
                });
            }
            return res.json({
                data: __assign({ key: nextKey }, addresses[nextKey]),
            });
        });
    });
});
// update
app.post('/api/addresses/:addressId', function (req, res) {
    var body = req.body;
    var constraints = {
        firstName: { presence: true },
        lastName: { presence: true },
        address1: { presence: true },
        city: { presence: true },
        state: { presence: true },
        zipCode: { presence: true },
        email: { email: true, presence: true }
    };
    var validation = validate(body, constraints);
    if (validation) {
        return res.status(422).json({
            error: {
                status: 422,
                message: validation,
            }
        });
    }
    fs.readFile(__dirname + "/data/addresses.json", 'utf8', function (error, data) {
        if (error) {
            return res.status(400).json({
                error: {
                    status: 400,
                    message: error.message,
                }
            });
        }
        var addresses = JSON.parse(data);
        var addressId = req.params.addressId;
        if (!addresses[addressId]) {
            return res.status(404).json({
                error: {
                    status: 404,
                    message: 'address not found',
                }
            });
        }
        addresses[addressId] = body;
        fs.writeFile(__dirname + "/data/addresses.json", JSON.stringify(addresses, null, 4), 'utf8', function (error) {
            if (error) {
                return res.status(400).json({
                    error: {
                        status: 400,
                        message: error.message,
                    }
                });
            }
            return res.json({
                data: __assign({ key: addressId }, addresses[addressId]),
            });
        });
    });
});
app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, './dist/index.html'));
});
var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    var asciiLogo = "\n    \u2554\u2557 \u250C\u2500\u2510\u250C\u2500\u2510\u250C\u2500\u2510\u252C \u252C\u2566 \u2566\u2566\n    \u2560\u2569\u2557\u2502 \u2502\u2514\u2500\u2510\u2514\u2500\u2510\u2514\u252C\u2518\u2551 \u2551\u2551\n    \u255A\u2550\u255D\u2514\u2500\u2518\u2514\u2500\u2518\u2514\u2500\u2518 \u2534 \u255A\u2550\u255D\u2569";
    console.log('\n%s\nBossyUI Preview running at http://localhost:%s\n', asciiLogo, port);
});
//# sourceMappingURL=index.js.map