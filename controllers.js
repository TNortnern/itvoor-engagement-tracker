const Redis = require('redis')
const redisClient = Redis.createClient()
const collections = global.collections

function readRange(key) {
  return new Promise((resolve, reject) => {
    redisClient.lrange(key, 0, -1, (error, data) => {
      if (error) reject(error)
      const result = data ? data.length : 0
      resolve(result)
    })
  })
}

module.exports = {
  pushToCache: ({ req, res }, collection) => {
    const data = req.body.id || req.body.ids
    const date = new Date().toJSON()
    const redisRequest = []
    if (data instanceof Array) {
      data.forEach(id => {
        redisRequest.push(redisClient.lpush(`${collection}&${id}`, date))
      })
    } else {
      redisRequest.push(redisClient.lpush(`${collection}&${data}`, date))
    }
    Promise.all(redisRequest)
      .then(() => res.status(201).send())
      .catch((error) => {
        console.error(error)
        res.status(500).send()
      })
  },
  readFromCache: ({ req, res }, collection) => {
    const id = req.params.id
    collection = collections.find(col => col.name === collection)
    const queries = []
    collection.actions?.forEach(action => queries.push(readRange(`${collection.name}?${action}&${id}`)))
    Promise.all(queries)
      .then((data) => {
        const result = {}
        data.forEach((el, index) => {
          result[collection.actions[index]] = el
        })
        res.json(result)
      })
      .catch(error => {
        console.error(error)
        res.status(500).send()
      })

  }
}