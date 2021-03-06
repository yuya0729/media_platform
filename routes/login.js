const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
  if(req.session.userName) {
    res.redirect('/');
  } else {
    res.render('login', {
      msg: ''
    });
  }
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
      req.session.userName = userName;
      return res.redirect('/');
    } else {
      return res.render('login', {
        msg: '間違ってるよ'
      });
    }
  });
});

module.exports = router;
