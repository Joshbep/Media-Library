const express = require('express');
const router = express.Router()
const Book = require('../models/books.js')
const Author = require('../models/author.js')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

//pulling all books
router.get('/', async (req, res) => {
  let query = Book.find()
  if(req.query.title != null && req.query.title != ''){
    query = query.regex('title', new ReqExp(req.query.title, 'i'))
  }
  if(req.query.publishedAfter != null && req.query.publishedAfter != ''){
    query = query.gte('publishDate', req.query.publishedAfter)
  }
  if(req.query.publishedBefore != null && req.query.publishedBefore != ''){
    query = query.lte('publishDate', req.query.publishedBefore)
  }
  const books = await query.exec()
  res.render('books/index.ejs', {
    books: books,
    searchOptions: req.query
  })
})


// new book route
router.get('/new', async (req, res) => {
  renderNewPage(res, Book.create())
})

//creating book
router.post('/', (req, res) => {
  Book.create(req.body, (error, createdBook) => {
		if (error) {
			console.log('error', error);
			res.send(error);
		} else {
			res.redirect('/books');
		}
	});
});

// UPDATE
router.put('/:id', (req, res) => {

})

async function renderFormPage(res, book, form, hasError = false) {
  const authors = await Author.find({})
  const params = {authors: authors, book: book}
  res.render(`books/${form}`, params)
}

// async function renderNewPage(res, book, hasError = false) {
//   rendorFormPage(res, book, 'new', hasError)
// }


module.exports = router
