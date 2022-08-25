//https://expressjs.com/en/guide/using-template-engines.html
const express = require('express')
const app = express()
const Author = require('./models/author.js')
const methodOverride = require('method-override');
const session = require('express-session')
require('dotenv').config()
const PORT = process.env.PORT || 3000

const SESSION_SECRET = process.env.SESSION_SECRET
console.log('here is the session secret')
console.log(SESSION_SECRET)
//now we can set up our session with our secret
app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))

const booksController = require('./controllers/booksController.js')
const authorController = require('./controllers/authorController.js')

const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
  console.log('connected to mongo')
})



app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))

app.use('/', booksController)
app.use('/authors', authorController)

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT} ✨`)
})
