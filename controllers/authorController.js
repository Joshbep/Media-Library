const express = require('express');
const router = express.Router()
const Author = require('../models/author.js')
const Book = require('../models/books.js')

const authRequired = (req,res,next) =>{
    if(req.session.currentUser){
        next()
    }else{
        res.redirect('/users/signin')
    }
}

//pulling all authors
router.get('/', authRequired, async (req, res) => {
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
router.get('/new', authRequired, (req, res) => {
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
  const author = await Author.findById(req.params.id)
  const books = await Book.find({ author: author.id }).limit(10).exec()
	res.render('authors/show.ejs', {
		author: author,
    booksByAuthor: books
	});
})

// Destroy author
router.delete('/:id', authRequired, (req, res) => {
  Author.findByIdAndRemove(req.params.id, (err, data) => {
    if(err) console.log(err)
    res.redirect('/authors')
  })
})

// Edit author
router.get('/:id/edit', authRequired, (req, res) => {
  Author.findById(req.params.id, (err, foundAuthor) => {
    if(err) {
      res.redirect('/authors')
    } else {
    res.render('authors/edit.ejs', {author: foundAuthor})
    }
  })
})

// UPDATE
router.put('/:id', (req, res) => {
  Author.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updateModel) => {
    res.redirect('/authors')
  })
})

module.exports = router
