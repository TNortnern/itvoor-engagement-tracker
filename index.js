const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const jsonParser = bodyParser.json()

app.post('/organizations/impression', jsonParser, (req, res) => {
  const { organizations } = req.body
    console.log(`organizations viewed: ${organizations}`)
})
app.post('/organizations/click', jsonParser, (req, res) => {
  const { organization } = req.body
  console.log(`organization click: ${organization}`)
})
app.post('/organizations/favourite', jsonParser, (req, res) => {
  const { organization } = req.body
  console.log(`organization favourited: ${organization}`)
})
app.post('/jobs/impression', jsonParser, (req, res) => {
  const { jobs } = req.body
    console.log(`jobs viewed: ${jobs}`)
})
app.post('/jobs/click', jsonParser, (req, res) => {
  const { job } = req.body
    console.log(`job click: ${job}`)
})
app.post('/jobs/application', jsonParser, (req, res) => {
  const { job } = req.body
    console.log(`job applied: ${job}`)
})
app.post('/events/impression', jsonParser, (req, res) => {
  const { events } = req.body
    console.log(`events viewed: ${events}`)
})
app.post('/events/click', jsonParser, (req, res) => {
  const { event } = req.body
    console.log(`event click: ${event}`)
})
app.post('/events/link-click', jsonParser, (req, res) => {
  const { event } = req.body
    console.log(`event link click: ${event}`)
})
app.post('/podcasts/impression', jsonParser, (req, res) => {
  const { podcasts } = req.body
    console.log(`podcasts viewed: ${podcasts}`)
})
app.post('/podcasts/click', jsonParser, (req, res) => {
  const { podcast } = req.body
    console.log(`podcast click: ${podcast}`)
})
app.post('/podcasts/play', jsonParser, (req, res) => {
  const { podcast } = req.body
    console.log(`podcast play: ${podcast}`)
})
app.post('/tags/click', jsonParser, (req, res) => {
  const { tag } = req.body
    console.log(`tag click: ${tag}`)
})
app.listen(3000, () => console.log('Listening port 3000...'))