const express = require('express')
const router = express.Router()

//pulling all authors
router.get('/', (req, res) => {
  res.render('authors/index.ejs')
})

// new author route
router.get('/new', (req, res) => {
  res.render('authors/new.ejs')
})

//creating authors
router.post('/', (req, res) => {
  res.send('go go go create')
})

module.exports = router
