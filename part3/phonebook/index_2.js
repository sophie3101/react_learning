const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config
const PhoneBook = require('./models/phone')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
app.use(express.json())
app.use(requestLogger)
app.use(cors())
app.use(express.static('build'))
// var morgan = require('morgan')

const generateId = () => {
    const maxID = persons.length > 0 ? Math.max(...persons.map(p=> p.id)) : 0
    return maxID + 1
}
app.get('/', (req, res) => {
    res.send('<h1>Exercises 3.1-3.6 </h1>')
})

app.get('/api/persons', (req, res) => {
    PhoneBook.find({})
            .then(contacts => res.json(contacts))
})

app.get('/info', (req, res) => {
    const peopleNum = persons.length
    const time = new Date()
    res.send(`<div> <p>Phonebook has info for ${peopleNum} people </p> <p>${time} </p></div>`)
})

app.get('/api/persons/:id', (request, response, next) => {
    PhoneBook.findById(request.params.id)
            .then(result => {
                if(result){
                    response.json(result)
                }else{
                    response.status(404).end()
                }
            })
            .catch(error => next(error))
  })

app.delete('/api/persons/:id', (req, res, next) => {
    PhoneBook.findByIdAndDelete(req.params.id)
            .then(deletedContact => {
                res.status(204).end()
            })
            .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const phone = {
        name: req.body.name,
        number: req.body.number
    }
    PhoneBook.findByIdAndUpdate(req.params.id, phone, {new:true} )
                .then(updatedContact => {
                    res.json(updatedContact)
                })
                .catch(error => next(error))
})
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.post('/api/persons/:id', (req, res) => {
    const body = req.body
    
    const person = new PhoneBook({
      name: body.name,
      number: body.number
    })

    person.save()
        .then(result => res.json(result))
        .catch(error => {
            console.log(error)
            next(error)
        })
})
// morgan.token('body', request => JSON.stringify(request.body))
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)
  
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
  
    next(error)
  }
  
app.use(errorHandler)
app.listen(3001, () => console.log('Server running on port 3001'))