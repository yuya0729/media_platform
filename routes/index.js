const express = require('express');
const router = express.Router();
const Note = require('../models/note');

/* GET home page. */
router.get('/', function(req, res, next) {
  Note.findAll({order:[['id', 'DESC']]}).then(notes => {
    res.render('index', {
      notes: notes,
      user: req.user
    });
  });
});

module.exports = router;
