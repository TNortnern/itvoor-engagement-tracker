require('dotenv').config()
const express = require('express')
const app = express()
const config = require('./config')
const collections = global.collections = config.collections
const { pushToCache, readFromCache } = require('./controllers')
const port = process.env.PORT || 3001

app.use(express.json())

collections.forEach(col => {
  col.actions?.forEach(action => {
    app.post(`/${col.name}/${action}`, (req, res) => {
      pushToCache({ req, res },`${col.name}?${action}`)
    })
  })
  app.get(`/${col.name}/:id`, (req, res) => {
    readFromCache({ req, res }, col.name)
  })
})

app.listen(port, () => console.log(`Express Engagement Tracker listening on port ${port}...`))