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

// show route for author
router.get('/:id', async (req, res) => {
  const author = await Author.findById(req.params.id);
  const books = await Book.find({ author: author.id }).limit(8).exec()
	res.render('authors/show.ejs', {
		author: author,
    booksByAuthor: books
	});
})

// Destroy author
router.delete('/:id', (req, res) => {
  Author.findByIdAndRemove(req.params.id, (err, data) => {
    if(err) console.log(err)
    res.redirect('/authors')
  })
})

// Edit author
router.get('/:id/edit', (req, res) => {
  Author.findById(req.params.id, (err, foundAuthor) => {
    res.render('authors/edit.ejs', {author: foundAuthor})
  })
})

// UPDATE
router.put('/:id', (req, res) => {
  Author.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updateAuthor) => {
    res.redirect(`/authors/${Author.id}`)
  })
})

module.exports = router
