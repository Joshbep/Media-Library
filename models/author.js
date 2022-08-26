const mongoose = require('mongoose')
const Book = require('./books')

const authorSchema = new mongoose.Schema({
  name: {type: String, required: true}
})

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;
