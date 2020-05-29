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
	res.redirect(`/notes/${id}`);
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
