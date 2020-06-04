const express = require('express');
const router = express.Router();
const Note = require('../models/note');

router.get('/', (req, res, next) => {
  const userName = req.session.userName;
  console.log(userName);
  Note.findAll({
    where: {
      createdBy: userName,
    },
  }).then(notes => {
    res.render('user', {
      notes: notes,
      userName: userName
    });
  })
});

module.exports = router;
