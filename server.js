//https://expressjs.com/en/guide/using-template-engines.html
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override');
require('dotenv').config()
const PORT = process.env.PORT

const booksController = require('./controllers/booksController.js')

const mongoose = require('mongoose')
const mongoURI = process.env.MONGODV_URI
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
  console.log('connected to mongo')
})



app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))

app.use('/', booksController)

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT} ✨`)
})
