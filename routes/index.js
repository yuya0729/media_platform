const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  Note.findAll({order:[['id', 'DESC']]}).then(notes => {
    res.render('index', {
      notes: notes,
      user: req.user
    });
  });
});

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;
  User.count({
    where: {
      userName: userName
    }
  }).then(data => {
    if(data != 0) {
      // console.log('もういるからだめだよ');
      /** tood
       * registerにrenderしてエラー分の表示
       */
      console.log(data);
      return res.render('register', {
        data: userName
      });
    } else {
      console.log('いないから作ろうね');
      /** tood
       * Userを作成し、/にリダイレクト
       */
      User.create({
        userName: userName,
        password: password
      });
      res.render('');
      return;
    }
  });
  console.log('owari');
})

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;
  /** todo
   * loginの時はそれを見つけてrender(login処理)
   * registryの時はcreateしてrender(register処理)
   */
  User.count({
    where: {
      userName: userName,
      password: password
    }
  }).then(data => {
    console.log(data);
  });

  // const hoge = Note.count({
  //   where: {
  //     'userName': userName
  //   }
  // })
  // User.findAll().then(users => {
  //   console.log(users);
  // });

  // User.create({
  //   userName: username,
  //   password: passwords
  // }).then()
  // Note.findAll({order:[['id', 'DESC']]}).then(notes => {
  //   res.render('index', {
  //     notes: notes,
  //     user: username
  //   });
  // });
  res.render('login');
});

// get add page
router.get('/notes/add/new', (req, res, next) => {
  res.render('add');
});

// get note content
router.get('/notes/:id([0-9]+)', (req, res, next) => {
  const id = req.params.id;
  Note.findByPk(id).then(note => {
    res.render('show', {
      note: note,
      user: req.user
    });
  });
});

// get edit page
router.get('/notes/:id/edit', (req, res, next) => {
  const id = req.params.id;
  Note.findByPk(id).then(note => {
    res.render('edit', {
      note: note,
      user: req.user
    });
  });
});

// create note
router.post('/notes/create', (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  Note.create({
    title: title,
    content: content,
    createdBy: req.user
  });
  return res.redirect('/');
});

// edit note
router.post('/notes/:id', (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const content = req.body.content;
  Note.findByPk(id).then(note => {
    note.update({
      title: title,
      content: content,
      createdBy: req.user
    });
  });
  return res.redirect(`/notes/${id}`);
});

// Delete
router.post('/notes/delete/:id([0-9]+)', (req, res, next) => {
  const id = req.params.id;
  Note.findByPk(id).then(note => {
    if(req.user === note.createdBy) {
      note.destroy().then(() => {
        res.redirect('/');
      });
    }
  });
});

module.exports = router;
