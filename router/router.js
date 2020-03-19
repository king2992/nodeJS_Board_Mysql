var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var board = require('./board/index')

router.use("/board", board);

module.exports = router;