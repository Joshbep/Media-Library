const express = require('express');
const router = express.Router()
const Author = require('../models/author.js')
//pulling all authors

router.get('/', async (req, res) => {
  let authors = await Author.find({});
  res.render('authors/index.ejs', {authors})
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
  res.send('go go go create')
})

module.exports = router
