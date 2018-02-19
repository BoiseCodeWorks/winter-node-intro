var express = require('express')
var bodyParser = require('body-parser')
var server = express()
var port = 3000

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))


// THE CODE ABOVE IS ALWAYS THE SAME ^^^^


var cats = []
var id = 0
function Cat(config) {
  id++
  this.id = id
  this.name = config.name
  this.mood = config.mood
  cats.push(this)
}

new Cat({ name: 'Mr. Snibley', mood: 'Grouchy' })

server.get('*', (request, response, next) => {
  console.log('I am being requested')
  next()
})

server.get('/api/cats', (request, response, next) => {
  response.send(cats)
})

server.get('/api/cats/:id', (req, res, next) => {
  var cat = findById(cats, req.params.id)

  if (cat) {
    return res.send(cat)
  }
  res.status(400).send({ error: 'Invalid ID' })
})

server.post('/api/cats', (req, res, next) => {
  var cat = new Cat(req.body)
  var responseObject = {
    message: 'Successfully created a new CAT',
    data: cat
  }
  res.send(responseObject)
})

server.put('/api/cats/:id', (req, res, next) => {
  var cat = findById(cats, req.params.id)
  if (cat) {
    for (var prop in req.body) {
      if (cat[prop] && prop != 'id') {
        cat[prop] = req.body[prop]
      }
    }
    return res.send({ message: 'Successfully updated the Cat', data: cat })
  }
  return res.status(400).send({error: 'Invalid ID'})


})





function findById(collection, id) {
  for (let i = 0; i < collection.length; i++) {
    const item = collection[i];
    if (item.id == id) {
      return item
    }
  }
}









// THE CODE BELOW DONT TOUCHY vvvvvvv

server.get('*', (req, res, next) => {
  res.status(404).send('<h1>404</h1>')
})

server.listen(port, () => {
  console.log('server running on port: ', port)
})