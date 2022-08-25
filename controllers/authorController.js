const express = require('express');
const router = express.Router()
const Author = require('../models/author.js')
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

// UPDATE
router.put('/:id', (req, res) => {
  Author.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updateAuthor) => {
    res.redirect('/authors')
  })
})

module.exports = router
