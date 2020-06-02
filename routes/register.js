const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const User = require('../models/user');

router.get('/', (req, res, next) => {
  res.render('register', {
    data: ''
  });
});

router.post('/', (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;
  User.count({
    where: {
      userName: userName
    }
  }).then(data => {
    if(data != 0) {
      return res.render('register', {
        data: userName
      });
    } else {
      User.create({
        userName: userName,
        password: password
      });
      return res.redirect('/');
    }
  });
});

module.exports = router;
