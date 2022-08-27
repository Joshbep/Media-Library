const express = require('express');
const router = express.Router()
const Author = require('../models/author.js')
const Book = require('../models/books.js')
//pulling all authors

router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  const authors = await Author.find(searchOptions);
  res.render('authors/index.ejs', {authors: authors, searchOptions: req.query});
})

// router.get('/seed', (req, res) => {
// 	Author.create(
// 		[
// 			{
// 				name: 'Christopher Paolini',
// 			},
// 			{
// 				name: 'J. R. R. Tolkien',
// 			},
// 			{
// 				name: 'J. K. Rowling',
// 			},
// 		],
// 		(err, data) => {
// 			res.redirect('/authors');
// 		}
// 	);
// });

// new author route
router.get('/new', (req, res) => {
  res.render('authors/new.ejs')
})

// show route for author
router.get('/:id', (req, res) => {
  res.send('id of author' + req.params.id)
})

//creating authors
router.post('/', (req, res) => {
	Author.create(req.body, (error, createdAuthor) => {
		if (error) {
			console.log('error', error);
			res.send(error);
		} else {
			res.redirect('/authors');
		}
	});
});

// Destroy author
router.delete('/:id', (req, res) => {
res.send('delete author' + req.params.id)})

// Edit author
router.get('/:id/edit', (req, res) => {
  res.send('edit author' + req.params.id)
  })
})

// UPDATE
router.put('/:id', (req, res) => {
  Author.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updateAuthor) => {
    res.redirect('/authors')
  })
})

module.exports = router
