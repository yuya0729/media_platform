const express = require('express');
const router = express.Router();
const Note = require('../models/note');

/* GET home page. */
router.get('/', (req, res, next) => {
  Note.findAll({order:[['id', 'DESC']]}).then(notes => {
    res.render('index', {
      notes: notes,
      userName: req.session.userName
    });
  });
});

module.exports = router;
