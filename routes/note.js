const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const User = require('../models/user');

// get add page
router.get('/add/new', (req, res, next) => {
  res.render('add');
});

// get note content
router.get('/:id([0-9]+)', (req, res, next) => {
  const id = req.params.id;
  Note.findByPk(id).then(note => {
    res.render('show', {
      note: note,
      user: req.user
    });
  });
});

// get edit page
router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  Note.findByPk(id).then(note => {
    res.render('edit', {
      note: note,
      user: req.user
    });
  });
});

// create note
router.post('/create', (req, res, next) => {
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
router.post('/:id', (req, res, next) => {
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
router.post('/delete/:id([0-9]+)', (req, res, next) => {
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
