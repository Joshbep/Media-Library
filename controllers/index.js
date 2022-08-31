const express = require('express')
const router = express.Router()
const Book = require('../models/books.js')
const Movie = require('../models/movies.js')

router.get('/', async (req, res) => {
  let books = await Book.find().sort({ createdAt: 'desc'}).limit(4).exec()
  let movies = await Movie.find().sort({ createdAt: 'desc'}).limit(4).exec()
  res.render('index.ejs', {books: books, movies: movies})
})

module.exports = router
