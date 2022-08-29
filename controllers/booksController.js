const express = require('express');
const router = express.Router()
const Book = require('../models/books.js')
const Author = require('../models/author.js')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

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

// show route for books
router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id).populate('author').exec()
  res.render('books/show.ejs', {book: book})
})

//creating book
router.post('/', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    description: req.body.description
  })
  saveCover(book, req.body.cover)

  try {
    const newBook = await book.save()
    res.redirect(`books/${newBook.id}`)
  } catch {
    renderNewPage(res, book, true)
  }
})

// DESTROY Book
router.delete('/:id', (req, res) => {
	Book.findByIdAndRemove(req.params.id, (err, data)=> {
		if(err) console.log(err)
		res.redirect('/books')
	})
})

// Edit book
router.get('/:id/edit', (req, res) => {
    Book.findById(req.params.id, async (err, book) => {
      const authors = await Author.find({})
      if(err) {
        console.log(err)
        res.redirect('/books')
      } else {
      res.render('books/edit.ejs', {book: book, authors: authors})
      }
    })
})

// UPDATE
router.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
		res.redirect('/books')
	})
})


async function renderNewPage(res, book, hasError = false) {
  renderFormPage(res, book, 'new', hasError)
}

async function renderFormPage(res, book, form, hasError = false) {
  try {
    const authors = await Author.find({})
    const params = {
      authors: authors,
      book: book
    }
    if (hasError) {
      if (form === 'edit') {
        params.errorMessage = 'Error Updating Book'
      } else {
        params.errorMessage = 'Error Creating Book'
      }
    }
    res.render(`books/${form}`, params)
  } catch {
    res.redirect('/books')
  }
}

function saveCover(book, coverEncoded) {
  if(coverEncoded == null) return
  const cover = JSON.parse(coverEncoded)
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    book.coverImage = new Buffer.from(cover.data, 'base64')
    book.coverImageType = cover.type
  }
}


module.exports = router
