const express = require('express');
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Book = require('../models/books.js')
const Author = require('../models/author.js')
const uploadPath = path.join('public', Book.coverImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, )
  }
})

//pulling all books
router.get('/', async (req, res) => {
  let query = Book.find()
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'))
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
router.post('/', upload.single('cover'), (req, res) => {
  const fileName = req.file != null ? req.file.filename : null
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

// async function renderFormPage(res, book, form, hasError = false) {
//   const authors = await Author.find({})
//   const params = {authors: authors, book: book}
//   res.render(`books/${form}`, params)
// }

async function renderNewPage(res, book, hasError = false) {
  const authors = await Author.find({})
  const params = { authors: authors, book: book}
  res.render('books/new.ejs', params)
}


module.exports = router
