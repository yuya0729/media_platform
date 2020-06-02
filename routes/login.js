const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const User = require('../models/user');

router.get('/', (req, res, next) => {
  res.render('login', {
    data: ''
  });
});

router.post('/', (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;
  User.count({
    where: {
      userName: userName,
      password: password
    }
  }).then(data => {
    if(data != 0) {
      return res.redirect('/');
    } else {
      return res.render('login', {
        data: '間違ってるよ'
      });
    }
  });
});

module.exports = router;
