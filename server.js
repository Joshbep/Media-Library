//https://expressjs.com/en/guide/using-template-engines.html
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const PORT = 3000
// const PORT = process.env.PORT

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT} ✨`)
})
