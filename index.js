require('dotenv').config()
const express = require('express')
const app = express()
const config = require('./config')
const collections = global.collections = config.collections
const { pushToCache, readFromCache } = require('./controllers')

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

app.listen(process.env.PORT || 3000, () => console.log('Listening port 3000...'))