//Pre middleware functions are executed one after another, when each middleware calls next.
//https://mongoosejs.com/docs/middleware.html#pre
const mongoose = require('mongoose')
const Movie = require('./movies')

const directorSchema = new mongoose.Schema({
  name: {type: String, required: true}
})

directorSchema.pre('remove', function(next) {
  Movie.find({ director: this.id }, (err, movies) => {
    if (err) {
      next(err)
    } else if (movies.length > 0) {
      next(new Error('This director has movies still'))
    } else {
      next()
    }
  })
})

const Director = mongoose.model('Director', directorSchema);
module.exports = Director;
