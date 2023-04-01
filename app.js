const express = require('express')
// const fallback = require('express-history-api-fallback')

const app = express()
const PORT = 3000

app.use(express.static('dist'))
// app.use(fallback('index.html', { root: './dist' }))

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`)
})

app.listen(PORT, function () {
  console.log(`app started on port ${PORT}!`)
})
