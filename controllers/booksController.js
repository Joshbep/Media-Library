const express = require('express');
const router = express.Router()
const Book = require('../models/books.js')
//pulling all books

router.get('/', async (req, res) => {
  res.send('All books')
})


// new book route
router.get('/new', (req, res) => {
  res.send('new book')
})

//creating book
router.post('/', (req, res) => {
  res.send('create book')
});

// UPDATE
router.put('/:id', (req, res) => {

})

module.exports = router
