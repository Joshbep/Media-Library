const express = require('express');
const router = express.Router()
const Movie = require('../models/movies.js')
const Director = require('../models/director.js')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

//pulling all books
router.get('/', async (req, res) => {
  let query = Movie.find()
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'))
  }
  if(req.query.releasedAfter != null && req.query.releasedAfter != ''){
    query = query.gte('releaseDate', req.query.releasedAfter)
  }
  if(req.query.releasedBefore != null && req.query.releasedBefore != ''){
    query = query.lte('releaseDate', req.query.releasedBefore)
  }
  const movies = await query.exec()
  res.render('movies/index.ejs', {
    movies: movies,
    searchOptions: req.query
  })
})


// new book route
router.get('/new', async (req, res) => {
  renderNewPage(res, Movie.create())
})

// show route for books
router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id).populate('director').exec()
  res.render('movies/show.ejs', {movie: movie})
})

//creating book
router.post('/', async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    director: req.body.director,
    releaseDate: new Date(req.body.releaseDate),
    movieLength: req.body.movieLength,
    description: req.body.description
  })
  saveCover(movie, req.body.cover)

  try {
    const newMovie = await movie.save()
    res.redirect(`movies/${newMovie.id}`)
  } catch {
    renderNewPage(res, movie, true)
  }
})

// DESTROY Book
router.delete('/:id', (req, res) => {
	Movie.findByIdAndRemove(req.params.id, (err, data)=> {
		if(err) console.log(err)
		res.redirect('/movies')
	})
})

// Edit book
router.get('/:id/edit', (req, res) => {
    Movie.findById(req.params.id, async (err, movie) => {
      const directors = await Director.find({})
      if(err) {
        console.log(err)
        res.redirect('/movies')
      } else {
      res.render('movies/edit.ejs', {movie: movie, directors: directors})
      }
    })
})

// UPDATE
router.put('/:id', (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
		res.redirect('/movies')
	})
})


async function renderNewPage(res, movie, hasError = false) {
  renderFormPage(res, movie, 'new', hasError)
}

async function renderFormPage(res, movie, form, hasError = false) {
  try {
    const directors = await Director.find({})
    const params = {
      directors: directors,
      movie: movie
    }
    if (hasError) {
      if (form === 'edit') {
        params.errorMessage = 'Error Updating Movie'
      } else {
        params.errorMessage = 'Error Creating Movie'
      }
    }
    res.render(`movies/${form}`, params)
  } catch {
    res.redirect('/movies')
  }
}

function saveCover(movie, coverEncoded) {
  if(coverEncoded == null) return
  const cover = JSON.parse(coverEncoded)
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    movie.coverImage = new Buffer.from(cover.data, 'base64')
    movie.coverImageType = cover.type
  }
}


module.exports = router
