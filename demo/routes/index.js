var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.locals.title = "BossyUi - Demo";

    res.render('index');
});

module.exports = router;
