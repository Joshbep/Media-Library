const express = require('express')
const router = express.Router()
const Book = require('../models/books.js')

router.get('/', async (req, res) => {
  let books
  books = await Book.find().sort({ createAt: 'desc'}).limit(10).exec()
  res.render('index.ejs', {books: books})
})

module.exports = router
