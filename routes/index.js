var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
})
router.get('/createGame', (req, res, next) => {
  res.render('new_game')
})
router.get('/game', (req, res, next) => {
  res.render('game')
})

module.exports = router;
