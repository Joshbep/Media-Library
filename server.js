//https://expressjs.com/en/guide/using-template-engines.html
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override');
const PORT = 3000
// const PORT = process.env.PORT

const booksController = require('./controllers/index.js')


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))

app.use('/', booksController)

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT} ✨`)
})
