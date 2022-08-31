const express = require('express');
const router = express.Router()
const Director = require('../models/director.js')
const Movie = require('../models/movies.js')

//pulling all directors
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  const directors = await Director.find(searchOptions);
  res.render('directors/index.ejs', {directors: directors, searchOptions: req.query});
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

// new director route
router.get('/new', (req, res) => {
  res.render('directors/new.ejs')
})


//creating director
router.post('/', (req, res) => {
	Director.create(req.body, (error, createdDirector) => {
		if (error) {
			console.log('error', error);
			res.send(error);
		} else {
			res.redirect('/directors');
		}
	});
});

// show route for director
router.get('/:id', async (req, res) => {
  const director = await Director.findById(req.params.id)
  const movies = await Movie.find({ director: director.id }).limit(10).exec()
	res.render('directors/show.ejs', {
		director: director,
    moviesBydirector: movies
	});
})

// Destroy director
router.delete('/:id', (req, res) => {
  Director.findByIdAndRemove(req.params.id, (err, data) => {
    if(err) console.log(err)
    res.redirect('/directors')
  })
})

// Edit director
router.get('/:id/edit', (req, res) => {
  Director.findById(req.params.id, (err, foundDirector) => {
    if(err) {
      res.redirect('/directors')
    } else {
    res.render('directors/edit.ejs', {director: foundDirector})
    }
  })
})

// UPDATE director
router.put('/:id', (req, res) => {
  Director.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updateModel) => {
    res.redirect('/directors')
  })
})

module.exports = router
